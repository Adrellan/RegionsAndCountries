FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app
COPY RegionsAndCountries-api .
RUN dotnet restore "RegionsAndCountries-api/RegionsAndCountries-api.csproj"
RUN dotnet publish "RegionsAndCountries-api/RegionsAndCountries-api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "RegionsAndCountries-api.dll"]