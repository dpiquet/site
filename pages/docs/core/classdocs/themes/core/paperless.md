---
layout: page
title: Paperless
namespace: Freesewing\Themes\Core
tags: [class docs]
permalink: /docs/core/classdocs/themes/core/paperless
---
## Description 

The [`Paperless`](paperless) theme is a theme that aims to
provide you a pattern you don't have to print out to use.

Pattern designers can implement specific features 
(typically extra dimensions) that will only be 
added when using a pattern that returns `true` to a 
[`Theme::isPaperless`] call (like this one).

In addition, this theme will overlay a grid on all pattern parts,
either metric or imperial, based on the requested output units.

## Example 

{% include coreClassdocsFigure.html
    description="An example of the paperless theme"
    params="service=draft&pattern=AaronAshirt&theme=Paperless"
%}

## Public methods

### themePattern

```php?start_inline=1
void themePattern(
    \Freesewing\Pattern $pattern
)
```

This is where, as a theme designer, you theme the [`Pattern`](../../patterns//core/pattern) object.

This [`Paperless`](paperless) theme overrides [`Theme::themePattern`](theme#themepattern) to
add the grid overlay.

#### Typical use
{:.no_toc}
Called by the service classes after the pattern is drafted/sampled, but before it's rendered.

#### Parameters
{:.no_toc}

- [`Pattern`](../../patterns//core/pattern) `$pattern` : The pattern object to theme.

### themeSvg

```php?start_inline=1
void themeSvg(
    \Freesewing\SvgDocument $svgDocument
)
```

This is where, as a theme designer, you theme the [`SvgDocument`](../../patterns//core/pattern) object.

By default, this loads the theme templates, and adds the (debug) messages from the pattern.

Here, this is where the grid overlay is added to SVG defs.

#### Typical use
{:.no_toc}
Called by the service classes after the pattern is drafted/sampled, but before it's rendered.

#### Parameters
{:.no_toc}

- [`SvgDocument`]../../classdocs/src/svgdocument) `$svgDocument` : The [`SvgDocument`]../../classdocs/src/svgdocument) object to theme.

## See also

The [`Theme`](theme) parent class.

{% include classFooter.html %}
* TOC - Do not remove this line
{:toc}
