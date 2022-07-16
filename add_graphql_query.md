# How to add a graphql query

* You can test your graphql queryies using the [GraphQL Playground](https://app.contentful.com/spaces/8cgixl4nm4b7/apps/app_installations/graphql-playground/graphql) App on Contentful

Example of a query:

```
query eventsPageQuery($locale: String!) {
  eventCollection(limit: 50, locale: $locale, order: startingDate_DESC, where : {category: "orientation"}) {
    items {
      ...EventMetadata
      sessionsCollection(limit: 50) {
        items {
          sys {
            id
          }
          speaker {
            avatar {
              url
            }
            name
          }
        }
      }
    }
  }
}
fragment EventMetadata on Event {
  poster {
    url
  }
  title
  slug
  description
  category
  startingDate
  onlineEvent
  location
  url
  quota
  notes
}
```

* Once you have a valid query, you can add it to the `src/graphql/client` folder.
* Run `yarn codegen` to generate the corresponding graphql code in `src/generated/graphql.ts`
* You can then use the new generated code in your component like the following:

```javascript
const data = await cms().conferencesPageQuery({
    locale: i18n["i18n-code"][locale],
  });
  ```
