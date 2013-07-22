# Thorax Generator

A Thorax generator for Yeoman that provides a boilerplate app out of the box. There are also a number of sub-generators which are used to create individual views, models, collections, etc.

## Getting started

- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-thorax`
- Run: `yo thorax [app-name]`

## Generators

Available generators:

* [thorax](#application)
* [thorax:router](#router)
* [thorax:view](#view)
* [thorax:model](#model)
* [thorax:collection](#collection)
* [thorax:collection-view](#collection-view)
* [thorax:helper](#helper)
* [thorax:view-helper](#view-helper)

### Application

Generates a basic new Thorax app.

```
yo thorax [application-name]
```

### Router

Generates a new router in `js/routers/[router-name].js`.

```
yo thorax:router [router-name]
```

### View

Generates a new View class in `js/views/[view-name].js`.

```
yo thorax:view [view-name]
```

### Model

Generates a new Model class in `js/models/[model-name].js`.

```
yo thorax:model [model-name]
```

### Collection

Generates a new Collection class in `js/collections/[collection-name].js`.

```
yo thorax:collection [collection-name]
```

### Collection View

Generates a new CollectionView class in `js/views/[collection-view-name].js`.

```
yo thorax:collection-view [collection-view-name]
```

### Helper

Generates a new Handlebars helper in `js/helpers/[helper-name].js`.

```
yo thorax:helper [helper-name]
```

### View Helper

Generates a new Handlebars helper in `js/helpers/[view-helper-name].js`.

```
yo thorax:view-helper [view-helper-name]
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
