# Docker Compose
## Basic Commands
* docker-compose up -d
* docker-compose up [Service Name]
* docker-compose up --force-recreate [Service Name]
* docker-compose down
* docker-compose exec -it [Service Name] [Command]
* docker-compose logs [Service Name]

## Profile
```yml
  scheduler:
    build: scheduler/.
    profiles:
      - scheduling_services
  storefront: 
    build: storefront/.
    profiles:
      - storefront_services
```

```
docker-compose --profile=storefront up
```

## Multiple Docker Compose file
```
# docker-compose.override.yml
services:
  scheduler:
    environment:
      - runtime_env=default
  storefront:
    environment:
      - runtime_env=default
```

```
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
```

## Environment Variables
1. Specified database version in docker-compose.yml
    ```yml
    services:
        database: 
            image: "mysql:${TAG:-latest}"
    ```
2. Create .env file for configure tag
    ```
    TAG=latest
    ```

## Getting start with ASP.Net Core
1. Create new project
```
dotnet new webapi -o Weather.Api
```
2. Create launch.json and task.json
* Click debugging tab and click `create a launch.json file`
3. Add Dockerfile to workspace
* ctrl + shift + p
* type: add docker file
* select ASP.Net Core
* select linux
* select port
* select No (Don't create a docker-compose file)
* add dockerServerReadyAction
```
"dockerServerReadyAction": {
    "action": "openExternally",
    "pattern": "\\bNow listening on:\\s+(https?://\\S+)",
    "uriFormat": "%s://localhost:%s/swagger"
}
```
4. Launch with `Docker .Net Code`

> For more information go to [dotnet-docker](https://github.com/dotnet/dotnet-docker)


## Logging with SeriLog
1. Install nuget package
```
dotnet add package Serilog.AspNetCore  
```
2. Update Program.cs
```
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.Seq(serverUrl: "http://host.docker.internal:8005")
    .CreateLogger();

try{
    var builder = WebApplication.CreateBuilder(args);
    ....
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
```
3. Add useSeriLog() on CreateHostBuilder function
```
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSerilog(); // <- Add this line
...
app.Run();
```

4. Add sample logging
```
_logging.LogInformation("Generate random weather");
```

5. See Log information in Debug Console

6. Add sink for SeriLog (seq)
```
dotnet add package Serilog.Sinks.Seq
```

8. Start Seq with docker
```
docker pull datalust/seq:latest
docker run --name seq -e ACCEPT_EULA=Y -p 5341:80 datalust/seq:latest
```

8. Add write to seq on Logger configuration
```
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.Seq(serverUrl: "http://host.docker.internal:5341")
    .CreateLogger();
```

9. Check logging at [http://localhost:5341](http://localhost:5341)

## Building Image
Build and run image
```
cd to Dockerfile path
docker build -t weather:latest .
docker run -d -p 8080:80 -e ASPNETCORE_ENVIRONMENT=Development --name [CONTAINER_NAME] weather:latest
```

Rename tag
```
docker tag [SOURCE_IMAGE]:[TAG_NAME]
```

Push to Container Registry
```
docker push [DOCKERHUB_USER]/[IMAGE_NAME]:[TAG_NAME]
docker push --all-tags [DOCKERHUB_USER]/[IMAGE_NAME]
```

### Add SeriLog to docker compose
```
seq:
    image: datalust/seq:latest
    ports:
        - "8005:80"
    environment:
        - ACCEPT_EULA=Y
```

### Add MSSQL Database
Pull MSSQL Server
```
docker pull mcr.microsoft.com/mssql/server:2022-latest
```
Check latest version at [hub.docker.com](https://hub.docker.com/_/microsoft-mssql-server)

Update docker compose file
```
sql_server:
    build:
        context: .
        dockerfile: sql.dockerfile
    restart: always
    ports:
        - "1433:1433"
    environment:
        - ACCEPT_EULA=Y
        - SA_PASSWORD=SuperSecretPassword
```

