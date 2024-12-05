# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the project files for DrawAndGuess.Entities, DrawAndGuess.Interfaces, and DrawAndGuess.SignalR
COPY ./DrawAndGuess.Entities/DrawAndGuess.Entities.csproj ./DrawAndGuess.Entities/
COPY ./DrawAndGuess.DataAccess/DrawAndGuess.DataAccess.csproj ./DrawAndGuess.DataAccess/
COPY ./DrawAndGuess.API/DrawAndGuess.API.csproj ./DrawAndGuess.API/

# Restore dependencies for the SignalR project (specify the .csproj file explicitly)
RUN dotnet restore ./DrawAndGuess.API/DrawAndGuess.API.csproj

# Copy the rest of the application files
COPY . ./ 

# Build the application (specify the .csproj file explicitly)
RUN dotnet publish ./DrawAndGuess.SignalR/DrawAndGuess.API.csproj -c Release -o /out

# Use the official ASP.NET Core runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set the working directory inside the runtime container
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /out ./ 

# Expose the port the SignalR app listens on
EXPOSE 5050
EXPOSE 5051

# Set the entry point to run the SignalR application
ENTRYPOINT ["dotnet", "DrawAndGuess.API.dll"]
