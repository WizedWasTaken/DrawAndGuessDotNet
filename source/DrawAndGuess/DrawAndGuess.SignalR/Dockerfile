# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the project files for DrawAndGuess.Entities, DrawAndGuess.Interfaces, and DrawAndGuess.SignalR
COPY ./DrawAndGuess.Entities/DrawAndGuess.Entities.csproj ./DrawAndGuess.Entities/
COPY ./DrawAndGuess.Interfaces/DrawAndGuess.Interfaces.csproj ./DrawAndGuess.Interfaces/
COPY ./DrawAndGuess.SignalR/DrawAndGuess.SignalR.csproj ./DrawAndGuess.SignalR/

# Restore dependencies
RUN dotnet restore

# Copy the rest of the application files
COPY . ./ 

# Build the application
RUN dotnet publish ./DrawAndGuess.SignalR/DrawAndGuess.SignalR.csproj -c Release -o /out

# Use the official ASP.NET Core runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set the working directory inside the runtime container
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /out ./ 

# Expose the port the SignalR app listens on
EXPOSE 5000
EXPOSE 5001

# Set the entry point to run the SignalR application
ENTRYPOINT ["dotnet", "DrawAndGuess.SignalR.dll"]
