# Markdown Cheat Sheet

This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax) and [extended syntax](https://www.markdownguide.org/extended-syntax).

## Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

### Heading

# H1

## H2

### H3

### Bold

```md
### Heading

# H1

## H2

### H3
```

**bold text**


```md
**bold text**
```

### Italic

*italicized text*

```md
*italicized text*
```

### Blockquote

> blockquote

```md
> blockquote
```

### Ordered List

1. First item
2. Second item
3. Third item

```md
1. First item
2. Second item
3. Third item
```

### Unordered List

- First item
- Second item
- Third item

```md
- First item
- Second item
- Third item

```

### Inline Code

`code`

```md
`code`
```

### Horizontal Rule

---

```md
---
```

### Link

[Markdown Guide](https://www.markdownguide.org)

```md
[Markdown Guide](https://www.markdownguide.org)
```

### Image

It is best to place images in subfolder called `figures/`, for example `src/Markdown_Doc/figures`

![alt text](./figures/Lunar_Year_photo_credit_Ed_Simmons.jpg)

When referencing the figure provide the relative path `./` means current directory, and `../` is the directory above

```md
![alt text](./figures/Lunar_Year_photo_credit_Ed_Simmons.jpg)
![alt text](../Introduction/mdbook-qr-code.png)
```

## Extended Syntax

These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

### MathJax

Maths is rendered using a version of LaTeX called MathJax 

#### Block maths

\\[
    E\ =\ mc^2 
\\]

```md
\\[
    E\ =\ mc^2 
\\]
```

#### Inline maths

This is inline maths, \\( E\ =\ mc^2 \\) .

```md
This is inline maths, \\( E\ =\ mc^2 \\) .
```

### Table

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

```md
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
```

### Fenced Code Block

Many language syntaxs are supported

No syntax
```
{
  "Animal": "Dog",
  "Breed": "Norweigan Elkhound",
  "age": 12
}
```

````md
```
{
  "Animal": "Dog",
  "Breed": "Norweigan Elkhound",
  "age": 12
}
```
````

With syntax, ie Matlab

```matlab
a = 3;
b = a*a;
c = a*a*a;
d = sqrt(a);
fprintf('%4u square equals %4u \r', a, b)
fprintf('%4u cube equals %4u \r', a, c)
fprintf('The square root of %2u is %6.4f \r', a, d)
```


With syntax, ie c

```c
int a = 3;
int b = a*a;
int c = a*a*a;
int d = sqrt(a);
printf('%4u square equals %4u \r', a, b)
printf('%4u cube equals %4u \r', a, c)
printf('The square root of %2u is %6.4f \r', a, d)
```

### Footnote

Here's a sentence with a footnote. [^1]

```md
Here's a sentence with a footnote. [^1]
```

### Heading ID

### My Great Heading {#custom-id}

```md
### My Great Heading {#custom-id}
```

### Definition List

term
: definition

### Strikethrough

~~The world is flat.~~

```md
~~The world is flat.~~
```

### Task List

- [x] Write the press release
  - [ ] Update the website
    - [ ] Contact the media

```md
- [x] Write the press release
  - [ ] Update the website
    - [ ] Contact the media
```

(See also [Copying and Pasting Emoji](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))

### Highlight

Using HTML you can hightlight. 

<span style="color: red;">This text will be red.</span>

<span style="color: blue;">This text will be blue.</span>

```html
<span style="color: red;">This text will be red.</span>

<span style="color: blue;">This text will be blue.</span>
```

### Subscript

H\\(_2\\)0

```md
H~2~O
```

### Superscript

X\\(^2\\)

```md
X\\(^2\\)
```

```md
[^1]: This is the footnote.
```

[^1]: This is the footnote.

## HTML

You can use HTML to further format the content inconjuction with markdown. Most commonly used tags are `<div>`, `<p>` and `<table>`

### Centering Content

<div align=center>

![alt text](./figures/Lunar_Year_photo_credit_Ed_Simmons.jpg)

Figure 2: Center content

</div>

```html
<div align=center>

![alt text](./figures/Lunar_Year_photo_credit_Ed_Simmons.jpg)

Figure 2: Center content

</div>
```

### Table

<table>
    <tr>
        <td> Syntax </td>
        <td> Description </td>
    </tr>
    <tr>
        <td> Header </td>
        <td> Title </td>
    </tr>
    <tr>
        <td> Paragraph </td>
        <td> Text </td>
    </tr>
</table>

```html
<table>
    <tr>
        <td> Syntax </td>
        <td> Description </td>
    </tr>
    <tr>
        <td> Header </td>
        <td> Title </td>
    </tr>
    <tr>
        <td> Paragraph </td>
        <td> Text </td>
    </tr>
</table>
```