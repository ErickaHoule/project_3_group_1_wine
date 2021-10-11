# Sunburst map with a "come back" button

https://observablehq.com/@shuaihaofzny/sunburst-map-of-nyc-crime-data-in-2018@115

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/@shuaihaofzny/sunburst-map-of-nyc-crime-data-in-2018@115.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@shuaihaofzny/sunburst-map-of-nyc-crime-data-in-2018";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
