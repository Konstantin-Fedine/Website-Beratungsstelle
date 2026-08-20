# Google-Sheets-Synchronisierung

## Einmalige Einrichtung

1. In Google Cloud ein Projekt mit aktivierter Google-Sheets-API erstellen.
2. Einen Service Account anlegen und dessen JSON-Schlüssel herunterladen.
3. Alle Ziel-Tabellen mit der E-Mail-Adresse des Service Accounts als Bearbeiter teilen.
4. Den Pfad zur JSON-Datei als Umgebungsvariable setzen:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\Pfad\service-account.json"
```

## Inhalte hochladen

```powershell
npm run sync-content
```

Das Skript liest die `data-text`-Felder direkt aus den öffentlichen HTML-Dateien und ersetzt den Inhalt der jeweils ersten Tabelle in den hinterlegten Google-Sheets.