# Dragable

a dragable lib to let a HTMLElement to be dragable in a container.

## Features

+ typescript features & vanilla js    
+ support ie9+

## Installing

Using npm:

```
$ npm install @autots/dragable -S
```

Using yarn:

```
$ yarn add @autots/dragable
```

## Example

### layouts

```
<section id="demo1">
  <div class="child1">drag area</div>
</section>

<section id="limit-container">
  <div id="demo2">
    <div class="child2">drag area1</div>
    <div class="child2">drag area2</div>
    <div class="child2">drag area3</div>
  </div>
</section>
```

### import as a module

```
import Dragable from '@autots/dragable';

// 1. The simplest way
new Dragable('#demo1');

// 2. use config
new Dragable('#demo2', {
  container: '#limit-container', // default is window
  dragArea: '.child2',
  zIndex: 100, // default is 999;
})
```

### import as a lib

```
<script src="dist/dragable.min.js"></script>

<script>
  var dragableDemo = new AutoTs.Dragable(el, config);
</script>
```

## Config

| Name | Type | Default | Optional | Description |
|:-----------:|:---------------:|:----------:|:-------:|:-----------------------|
| el | string | - | false | the element can be dragged |
| config.container | window \| string | window | true | the container where the el can move |
| config.dragArea | string | default equals el | true | the elements which can trigger drag behavior |
| config.zIndex | number | 999 | true | the css attr 'z-index' added to el |
