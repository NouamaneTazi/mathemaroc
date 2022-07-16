# Math&maroc website

Landing page for Math&Maroc, made using Next.js, Chakra UI, and Contentful

### headless CMS

For now we're using **Contentful** which provides 2 locales max for free (see [link](https://www.contentful.com/pricing/))

We can use [**strapi**](https://strapi.io/starters/strapi-starter-next-js-blog) an open-source headless CMS, which we can host on Heroku for free, which would remove all limits

### Installation

* Install yarn from: <https://classic.yarnpkg.com/lang/en/docs/install/>
* In your command shell, run `yarn` to install dependencies
* Create a `.env` file in the root directory of the project by copying the `.env.local.example` file and filling the values

### Start the application

To run your site locally, use:

```
yarn dev
```

To run it in production mode, use:

```
yarn build
yarn start
```

### Inspiration

* <https://github.com/surabayajs/surabayajs.org>
* <https://chakra-ui.com/showcase>
