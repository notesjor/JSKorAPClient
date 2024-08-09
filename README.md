The JSKorapClient is an example implementation of the KorAP API for
plain JavaScript. The client can be found in the folder
\"Nuxt3/korapJsClient\". The individual functions of the client are
divided into separate files - so only the required functions can be
loaded/imported into the web application. The code is documented with
JSDoc in English - here the documentation of the public functions is in
German - so if you need English documentation, please use the JSDoc
data. We use Nuxt3 for many of our web applications. Therefore, the
examples are implemented in Nuxt3. The examples are designed in such a
way that they are understandable even without extensive knowledge of
Nuxt3. You can find the examples in Nuxt3/components\
\
Der JSKorapClient ist eine Beispiel-Implementierung der KorAP-API für
Plain-JavaScript. Der Client ist im Ordner „Nuxt3/korapJsClient" zu
finden. Die einzelnen Funktionen des Clients sind in separate Dateien
aufgeteilt -- so können nur die benötigten Funktionen in die
Web-Applikation geladen/importiert werden. Der Code ist mit JSDoc auf
Englisch dokumentiert -- hier erfolgt die Dokumentation der öffentlichen
Funktionen auf Deutsch. Wir verwenden Nuxt3 für viele unser
Web-Applikationen. Daher sind die Beispiele in Nuxt3 implementiert. Die
Beispiele sind so gestaltet, dass sie auch ohne größere Einarbeitung in
Nuxt3 verständlich sind. Sie finden die Beispiele in Nuxt3/components.

-   **auth.js** -- Funktionen zur Authentifizierung

    -   **signIn(func)**:\
        Diese Funktion führt die Authentifizierung mittels KorAP OAuth2
        durch. Der Parameter func ist ein callback -- der immer nach
        erfolgter Authentifizierung aufgerufen wird. An func wird dann
        ein bool übergeben (true = erfolgreich / false = Fehler bei der
        Authentifizierung). signIn schreibt zudem Daten in localStorage
        -- die von allen anderen Funktionen des korapJSClient verwendet
        werden.

    -   **isSignedIn()**:\
        Gibt zurück (bool), ob signIn erfolgreich war -- Zur späteren
        Kontrolle der Authentifizierung.

    -   **signOut()**:\
        Löscht eine vorherige Authentifizierung.

    -   **bearerToken**:\
        Property, die im Falle einer erfolgreichen Authentifizierung den
        ausgehandelten BearerToken für die Authentifizierung
        bereitstellt.

-   **kwic.js** -- Abrufen von KWIC-Belegen / bzw. Volltextsuche

    -   **availableLanguages**:\
        Property, die eine Liste aller verfügbaren Abfragesprachen
        bereitstellt.

    -   **search(bearerToken, corpusQuery, query, queryLanguage, page,
        func)\
        **Funktion zur Volltextsuche. Zur vereinfachten Verarbeitung der
        Ergebnisse (die an func als Callback übergeben werden) stehen
        die Funktionen searchResult\_\* (siehe unten) in diesem Client
        zur Verfügung). Folgende Parameter sind verfügbar:

        -   **bearerToken** -- Wenn null/leer, dann erfolgt die Suche
            nur in den öffentlichen Korpora. Über auth.js (siehe oben)
            kann mittels erfolgreichem signIn() ein BearerToken
            ausgestellt werden. Dieses kann dann über die Property
            bearerToken (auth.js) abgerufen werden. Das BearerToken
            erhält dann die Legitimationen (Korpuszugriff), die die
            jeweilige Person hat.

        -   **corpusQery** -- Der corpusQuery erlaubt die Einschränkung
            des Korpus anhand bestimmter Metadaten. Siehe hierzu:\
            https://github.com/KorAP/Kustvakt/wiki/Service:-Search-GET\
            Bsp.: corpusSigle=GOE & creationDate since 1820 --
            Einschränkung auf Korpus GOE und Texte ab 1820.

        -   **query** - Abfrage. Diese ist abhängig von der
            Abfragesprache. Verfügbare Abfragesprachen können über
            **availableLanguages** (kwic.js) abgerufen werden (siehe
            oben). Die Festlegung der Abfragesprache erfolgt über den
            Parameter queryLanguage (siehe unten).

        -   **queryLangauge** -- Legt die Abfragesprache für query
            (siehe oben) fest. Verfügbare Abfragesprachen können über
            **availableLanguages** (kwic.js) abgerufen werden (siehe
            oben).

        -   **page** -- Nr. der Such-Seite (Standardwert: 1).

        -   **func** -- Callback wird nach erfolgter Suche aufgerufen.
            Ist die Suche erfolgreich, wird das Suchergebnis übergeben
            -- in der Logik dieses Clients wird ein erfolgreiches
            Ergebnis als searchResult bezeichnet. Ist die Suche nicht
            erfolgreich, wird null an func übergeben.

    -   **searchResult_GetTotal(searchResult)** -- Gibt die Gesamtzahl
        (number) aller Suchergebnisse zurück. searchResult muss zuvor
        mit search(...) (siehe oben) ermittelt werden.

    -   **searchResult_GetMaxPage(searchResult)** -- Berechnet die
        maximale Anzahl an Seiten für eine Suchanfrage (siehe oben
        search(...) -- Parameter: page).

    -   **searchResult_GetBenchmark(searchResult)** -- Gibt
        Benchmark-Infos zur Abfrage aus. Eher für Testing-Zwecke
        gedacht, als für normale Nutzerinteraktion.

    -   **searchResult_GetKoralQuery(searchResult)** -- Gibt den
        Koral-Query der Abfrage zurück.

    -   **searchResult_GetCollection(searchResult)** -- Gibt
        Informationen zur abgefragten Collection zurück. Eine Collection
        wird über die Kombination aus Zugriffsberechtigung (ermittelt
        durch BearerToken) und CorpusQuery (siehe oben) ermittelt.

    -   **searchResult_GetMatchesQuick(searchResult)** -- Gibt eine
        einfache und bereits aufbereitete Ergebnisliste zurück
        (Kombination aus searchResult_GetMatches und
        match_GetSnippetCleanExtended)

    -   **searchResult_GetMatches(searchResult)** -- Gibt die normale
        Ergebnisliste der KorAP API zurück. Diese muss ggf. noch
        aufbereitet werden. In der Logik dieses Clients entspricht dies
        einem Array von match (Funktionen zur vereinfachten Verarbeitung
        von match siehe unten).

    -   **match_GetMatchID(match)** -- Gibt die ID des Matches zurück.

    -   **match_GetSigle(match)** -- Gibt die Sigle (DeReKo spezifisch)
        zurück. Die Sigle setzt sich aus Korpus + Jahr + ggf. Monat + ID
        des Dokuments zusammen und ist für jedes Dokument in DeReKo
        eindeutig.

    -   **match_GetAuthor(match)** -- Gibt die Autoreninformation (falls
        verfügbar) zu einem Match aus.

    -   **match_GetTitle(match)** -- Gibt den Titel des Dokuments zu
        einem Match aus.

    -   **match_GetPubDate(match)** -- Gibt das Datum (je nach
        Verfügbarkeit unterschiedlich präzise) zu einem Match aus.

    -   **match_GetSnippet(match)** -- Gibt Snippet (Belegstelle) zu
        einem Match aus.

    -   **match_GetSnippetClean(match)** -- Die Funktion
        match_GetSnippet(match) (siehe oben) enthält mixed content
        (JSON + XML) diese Funktion bereinigt diese Daten und gibt sie
        als einfaches JSON zurück (left / match / right).

    -   **match_GetSnippetCleanExtended(match)** -- Bereinigt die
        Snippet-Daten ähnlich wie match_GetSnippetClean(match) (siehe
        oben) aber ergänzt die JSON Daten zusätzlich um die Properties
        (id, sigle, author, title und date).

    -   **match_GetLayerData(bearerToken, matchId, func)** -- Erlaubt
        den Abruf aller Layer (Foundries) für ein gegebenes Match.
        Parameter:

        -   **bearerToken** - Wenn null/leer, dann können nur Matches
            öffentlicher Korpora abgefragt werden. Über auth.js (siehe
            oben) kann mittels erfolgreichem signIn() ein BearerToken
            ausgestellt werden. Dieses kann dann über die Property
            bearerToken (auth.js) abgerufen werden. Das BearerToken
            erhält dann die Legitimationen (Korpuszugriff), die die
            jeweilige Person hat.

        -   **matchId** -- siehe match_GetMatchID(match) zum Abfruf der
            matchID.

        -   **func** -- Callback -- an diese Funktion werden im
            Erfolgsfall die Daten übergeben.

-   **userInfo.js**

    -   **getUserInfo(bearerToken, func)**\
        Die Funktion gibt Informationen zum angemeldeten Nutzer-Account
        zurück. Folgende Parameter sind nötig:

        -   **bearerToken** -- Über auth.js (siehe oben) kann mittels
            erfolgreichem signIn() ein BearerToken ausgestellt werden.
            Dieses kann dann über die Property bearerToken (auth.js)
            abgerufen werden. Die Informationen beziehen sich daher
            immer auf den angemeldeten Nutzer-Account.

        -   **func** -- Callback Funktion an die (im Erfolgsfall) die
            Nutzeraccount-Daten übergeben werden.

-   **virtualCorpus.js**\
    Dieser Teil der API ist aktuell noch nicht implementiert, da die
    KorAP API hier noch nicht stabil ist.
