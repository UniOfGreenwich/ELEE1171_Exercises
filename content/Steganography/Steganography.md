# Steganography

~~~admonish info

By the end of this lab you should be able to:

- Explain the difference between encryption and steganography

- Encode and decode messages using LSB image steganography

- Detect steganography using forensic tools

- Understand and apply text-based stego techniques

- Reflect on steganography as a tool for privacy, security, and deception

~~~

## Part 1: LSB Steganography with Images

### Task 1.1: Encode a message in a PNG using `encode.py`

1. Firstly, create a script in a new folder called `stego/encode.py`

    ~~~admonish terminal

    ```sh
    $ mkdir stego && touch stego/encode.py
    ```
    ~~~

2. Open the `stego/encode.py` in your text editor of choice (I am using `vim`):

    ~~~admonish terminal

    ```
    $ cd stego/ 
    $ vim encode.py
    ```
    ~~~

3. Reproduce the following code: 

    ~~~admonish code title="encode.py, 53 lines" collapsible=true

    ```py
    from PIL import Image
    import sys

    def encode(image_path, output_path, message, bit_plane):
        if bit_plane < 1 or bit_plane > 7:
            raise ValueError("Bit plane must be between 1 and 7")

        img = Image.open(image_path)
        img = img.convert('RGBA')
        binary_msg = ''.join(f"{ord(c):08b}" for c in message) + '00000000'  # NULL terminator

        pixels = list(img.getdata())
        encoded_pixels = []

        bit_idx = 0
        mask = 1 << (bit_plane - 1)
        inverse_mask = 255 - mask

        for r, g, b, ain pixels:
            if bit_idx < len(binary_msg):
                r = (r & inverse_mask) | (int(binary_msg[bit_idx]) << (bit_plane - 1))
                bit_idx += 1
            if bit_idx < len(binary_msg):           
                g = (g & inverse_mask) | (int(binary_msg[bit_idx]) << (bit_plane - 1))
                bit_idx += 1
            if bit_idx < len(binary_msg):
                b = (b & inverse_mask) | (int(binary_msg[bit_idx]) << (bit_plane - 1))
                bit_idx += 1
            encoded_pixels.append((r, g, b, sca))

        img.putdata(encoded_pixels)
        img.save(output_path)
        print(f"Message encoded and saved to: {output_path}")

    if __name__ == "__main__":
        if len(sys.argv) != 5:
            print("Usage: encode.py <input_image> <output_image> <message> <bit_plane>")
            sys.exit(1)

        input_path = sys.argv[1]
        output_path = sys.argv[2]
        message = sys.argv[3]
        try:
            bit_plane = int(sys.argv[4])
        except ValueError:
            print("Bit plane must be an integer between 1 and 7")
            sys.exit(1)

        try:
            encode(input_path, output_path, message, bit_plane)
        except Exception as e:
            print(f"Error: {e}")
            sys.exit(1)
    ```
    ~~~

    ~~~admonish example title="Explanation" collapsible=true

    **Convert the Message to Binary**

    ```py
    binary_msg = ''.join(f"{ord(c):08b}" for c in message) + '00000000'
    ```
    
    - `ord(c)` converts each character (e.g., 'A') to its ASCII value (65)

    - `f"{...:08b}"` formats it as 8-bit binary (`'01000001'`)

    - `'00000000'` is a null terminator, signalling the end of the message

        - "This" → `01010100 01101000 01101001 01110011` + `00000000`

    **Bit Mask Setup**
    
    ```py
    mask = 1 << (bit_plane - 1)
    inverse_mask = 255 - mask
    ```
    - These control which bit of the byte we modify:
        - `1 << (bit_plane - 1)` shifts 1 left to target the desired bit.
        
        <br>
        
        | Bit Plane | Binary   | Decimal |
        | --------- | -------- | ------- |
        | 1 (LSB)   | 00000001 | 1       |
        | 2         | 00000010 | 2       |
        | 3         | 00000100 | 4       |
        | ...       | ...      | ...     |

    - `mask = 0b00000100` (for bit plane 3)
    - `inverse_mask = 0b11111011` — used to clear the target bit

    **Iterate Through Pixels and Modify Bits**

    ```py
    for r, g, b in pixels:
    if bit_idx < len(binary_msg):
        r = (r & inverse_mask) | (int(binary_msg[bit_idx]) << (bit_plane - 1))
    ```
    - Let’s break this math down:

        - `r & inverse_mask`: clears the target bit

            e.g., `r = 10110110`, `mask = 11111011` → `10110010`

        - `(int(binary_msg[bit_idx]) << (bit_plane - 1))`:

            - Converts the current binary digit (`0` or `1`) into the correct bit position

            - If `bit_plane = 3` and bit = `1`, you shift: `1 << 2 = 0b00000100`

        - `|` (bitwise OR) inserts the bit
            - This replaces just 1 bit in the color channel, leaving the rest untouched.

        - The same logic is applied to G and B if more bits remain.
    
    **Update the Image and Save**
    
    ```py
    img.putdata(encoded_pixels)
    img.save(output_path)
    ```
    
    - This writes your modified pixel data back and saves the output image.

    **Visual Summary (Example for R = 182, bit_plane = 3, bit = 1)**
    
    | Step               | Binary     | Decimal |
    | ------------------ | ---------- | ------- |
    | Original R         | `10110110` | 182     |
    | Clear bit 3        | `10110010` | 178     |
    | Bit to embed (`1`) | `00000100` | 4       |
    | New R              | `10110110` | 182     |

    If bit = `0`:

    | Clear + 0 → `10110010` | = 178 (b3 cleared)

    ~~~

4. Copy ,`cp`, the watefall_image from `/opt/gre/steganography_lab/waterfall_image.png` to the current directory and then run the program supplying the file name and other arguments as shown here:

    ~~~admonish terminal
    
    ```sh
    $ cp /opt/gre/steganography_lab/waterfall_image.png .
    $ python3 encode.py waterfall_image.png waterfall_image_stego_1.png "TEST" 1
    $ python3 encode.py waterfall_image.png waterfall_image_stego_2.png "TEST" 2
    $ python3 encode.py waterfall_image.png waterfall_image_stego_3.png "TEST" 3
    ```

    ~~~

5. Open images side by side using 

    ~~~admonish terminal
    
    ```sh
    $ feh -i -X -W 1476 -y 350 -E 700 iceland_waterfall*
    ```

    ~~~

    ~~~admonish output

    ![](./figures/iceland_waterfall_feh.png)
    
    Notice how even though we modified the LSB the original file has decreased by 100k.

    ~~~

6. Now use `pngcheck` to check the integrity of the `*.png`

    ~~~admonish terminal
    
    ```sh
    $ pngcheck -ts iceland_waterfall*
    ```
    ~~~

    ~~~admonish output collapsible=true

    ```sh
    OK: iceland_waterfall.png         (499x888, 32-bit RGB+alpha, non-interlaced, 51.1%).
    OK: iceland_waterfall_stego_1.png (499x888, 32-bit RGB+alpha, non-interlaced, 51.3%).
    OK: iceland_waterfall_stego_2.png (499x888, 32-bit RGB+alpha, non-interlaced, 51.3%).
    OK: iceland_waterfall_stego_3.png (499x888, 32-bit RGB+alpha, non-interlaced, 51.3%).

    No errors were detected in 4 of the 4 files tested.
    ```
    
    The images are structurally valid and pass PNG validation — which demonstrates how well steganography can hide in plain sight, even when tools like `pngcheck` say 'OK'

    Though we know that because we have the original to compare against, we do use the change in non-interlaced by 0.2%. 

    ~~~

7. Experiment with `pngcheck`, see `pngcheck --help` or `man pngcheck` to see what else you can do?


### Task 1.2: Reflection

~~~admonish question title="How does bit plane depth affect detectability and capacity?" collapsible=true

**Bit Plane = Position Within a Byte**

Each pixel color channel (Red, Green, Blue) is stored as an 8-bit number:

```
Bit positions: [7][6][5][4][3][2][1][0]  ← Bit plane
               MSB                  LSB
```

- **b1 (LSB)**: smallest visual impact

- **b8 (MSB)**: largest impact — most noticeable

**Impact breakdown**

| **Bit Plane** | **Capacity** | **Image Impact**     | **Detectability** |
| ------------- | ------------ | -------------------- | ----------------- |
| **b1 (LSB)**  | Low          | Imperceptible        | Hard              |
| **b2**        | Medium       | Barely visible       | Medium            |
| **b3**        | Higher       | Slight noise         | Detectable        |
| **b4–b7**     | Very High    | Noticeable artifacts | Easy              |


**Capacity vs. Quality Trade-off**

- Each pixel has 3 channels (RGB) → up to **3 bits per pixel** at b1

- Want more capacity? → use `b2`, `b3`, etc.

- But: Each jump doubles the impact

    | Bits Used | Max Data (in a 500×500 image) | Typical Use |
    | --------- | ----------------------------- | ----------- |
    | b1 only   | \~93 KB                       | Safe/secret |
    | b1+b2     | \~187 KB                      | Higher cap  |
    | b1–b3     | \~281 KB                      | Noticeable  |

**Detectability:**

Detection tools like `zsteg`, `stegdetect`, and statistical methods (e.g. chi-square, RS analysis):

- Are **tuned to spot unnatural patterns** in LSBs

- Higher bit planes (b3–b5) introduce more noise → easier to detect

- Even **visual diffing** can expose b3 or b4 usage

**Summary**

Think of it like whispering into a noisy room:

- b1 = whisper (hard to detect)

- b3 = speaking clearly (someone might hear)

- b6+ = shouting (anyone can spot it)

~~~

-----

## Part 2: Steganalysis Tools

~~~admonish info

Third party tools: `zsteg`, `binwalk`, `exiftool`, `stegsolve`

Our tool: `decode.py`

~~~

### Task 2.1: Analyze a stego image with `zsteg` and extract message


So far we have seen the results of enccoding text into images. We should therefore try to extract the text.
 
1. Using `s` to try to extract the message out of bit plane 1, `iceland_waterfall_stego_1.png`

    ~~~admonish terminal
    
    ```sh
    $ zsteg iceland_waterfall_stego_1.png
    ```
    
    ~~~

    ~~~admonish output collapsible=true
    
    ```
    ```

    ~~~

    - Repeat for the other two `iceland_waterfall_stego_2.png` and `iceland_waterfall_stego_3.png`
  
### Task 2.2 `decode.py`

1. Let's try and decode this ourselves using a python script will be write, Create a new python file called `decode.py` and reproduce the following

    ~~~admonish code title="decode.py, 35 lines" collapsible=true
    
    ```py
    from PIL import Image
    import sys

    def decode(image_path, bit_plane):
        if bit_plane < 1 or bit_plane > 7:
            raise ValueError("Bit plane must be between 1 and 7")

        img = Image.open(image_path)
        img = img.convert('RGB')
        pixels = list(img.getdata())

        bits = []
        mask = 1 << (bit_plane - 1)

        for r, g, b in pixels:
            bits.append(str((r & mask) >> (bit_plane - 1)))
            bits.append(str((g & mask) >> (bit_plane - 1)))
            bits.append(str((b & mask) >> (bit_plane - 1)))

        chars = []
        for i in range(0, len(bits), 8):
            byte = ''.join(bits[i:i+8])
            if byte == '00000000':  # NULL terminator
                break
            chars.append(chr(int(byte, 2)))

        message = ''.join(chars)
        print("Decoded message:", message)

    if __name__ == "__main__":
        if len(sys.argv) != 3:
            print("Usage: decode.py <image> <bit_plane>")
            sys.exit(1)

        image_path = sys.argv[1]
        try:
            bit_plane = int(sys.argv[2])
        except ValueError:
            print("Bit plane must be an integer between 1 and 7")
            sys.exit(1)

        try:
            decode(image_path, bit_plane)
        except Exception as e:
            print(f"❌ Error: {e}")
            sys.exit(1)
    ```

    ~~~

    ~~~admonish example title="Explanation" collapsible=true
    


    ~~~

### Task 2.3: What about `file --mime-type`?

The utility `file` can tell you what the magic number of the file is. Useful for matching extentsion to the acutal file encoding.

~~~admonish note

A magic number is a sequence of bytes at the beginning of a file that allows to identify which is the type of a file

For instance the magic number for a png is **89 50 4E 47**. Likewise a shell script is **23 21**
`#!` is encoded to the **bytes 23 21** which is the **magic number** of an executable script. 

~~~


1. Do this quickly, which will demonstrate the above

    ~~~admonish terminal

    ```sh
    $ cp iceland_watefall.png iceland_watefall.txt 
    ```

    ~~~

2. Now you can do two things first run

    ~~~admonish terminal

    ```sh
    $ file --mime-type iceland_waterfall.txt
    ```

    ~~~

    ~~~admonish output collapsible=true

    ```
    iceland_waterfall.txt: image/png
    ```
    Still recognised as a png, despite the extension change.   
    ~~~

3. We can look at hex with `xxd` tool.

    ~~~admonish terminal
    
    ```sh
    $ xxd iceland_waterfall.txt | head -n1
    ```

    ~~~

    ~~~admonish output collapsible=true
    
    ```
    00000000: 8950 4e47 0d0a 1a0a 0000 000d 4948 4452  .PNG........IHDR
    ```

    See how the magic number is 89504E47... it is still a png!

    ~~~


### Task 2.4: Open image in `stegsolve` and visually inspect bit planes


------

## Part 3: Text-Based Steganography

~~~admonish info

Tools: `snow`, `zwsp-steganography`, `cat -A`, `hexdump`

- Task 3.1: Use `snow` to hide a message in a `.txt` file via whitespace

- Task 3.2: Extract and decode the message

- Task 3.3: Try zero-width Unicode stego (`U+200B`, etc.)

- Task 3.4: Inspect files with `od -c` or `cat -v` to reveal anomalies

- Challenge

~~~

### Challenge

Try and encode/decode messages to each other

~~~admonish warning    

Do **not** embed payloads and any messge must be clean of defamatory marks and must not cause offense

Legal concerns, the skills/knowledge you are gaining/demonstrating here are for education purposes and should not be used in a way to break the law.

~~~

---------------------