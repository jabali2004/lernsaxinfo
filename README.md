# LernSaxInfo [Service wurde am 1. Juli 2021 eingestellt.]
> Statuschecker für das LernSax Portal!

![lernsaxinfo build](https://github.com/jabali2004/lernsaxinfo/workflows/lernsaxinfo%20build/badge.svg)

LernSaxInfo ist eine inoffizielle Statusseite welche die Erreichbarkeit des LernSax Portals erfasst.

Dieses kleine private Projekt ist innerhalb einer Nacht und Nebel Aktion entstanden. Verbesserungen sind also gern gesehen, da ich aktuell nur wenig Zeit für das kleine Projektchen aufwenden kann.

## Softwarestack

Es werden folgende Technologien genutzt:

- Angular
  - Angular material
  - NgBootstrap
- Azure cloud functions (NodeJS)
  - Puppeteer
  - cosmosDB

<!-- TODO: weitere Infos hinzufügen -->

## Projektstruktur

```` sh

/frontend/ # Angular Projekt
/backend_functions/ # API Funktionen
/worker_functions/ # Statuscheck Funktion

````

<!-- TODO: weitere Infos hinzufügen -->

## Installation

Installation der benötigten Pakete:

```` sh
npm install -g azure-functions-core-tools@3
npm install -g @angular/cli
````

### /frontend

Quickstart:

```` sh
npm install
npm start
````

Beim Frontend kommt die Angular Prerender Funktion zum Einsatz.

```` sh

npm run prerender # Für den lokalen Test

````

## Meta

lernsaxinfo – [@lernsaxinfo](https://twitter.com/lernsaxinfo) – lernsaxinfo@gmail.com

Verteilt unter der Apache 2.0 Lizenz. Siehe ``LICENSE`` für weitere Informationen.

## Mitwirken

1. Fork it (https://github.com/jabali2004/lernsaxinfo/fork)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
