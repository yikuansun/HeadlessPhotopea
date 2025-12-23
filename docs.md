# [headlessphotopea](https://github.com/yikuansun/HeadlessPhotopea#readme)

> Use the Photopea API invisibly.

## addBinaryAsset(buff)

Same as loadAsset; this was kept for backwards compatibility

### Parameters

| Name | Types  | Description                 |
| ---- | ------ | --------------------------- |
| buff | Buffer | file to load into Photopea. |

### Returns

Promise.&lt;true&gt;
true, once the file is loaded.

## destroy()

Kill this window.



### Returns

Promise.&lt;void&gt;


## emergencyRestart()

Restart the browser in an emergency situation.



### Returns

Promise.&lt;void&gt;


## exportImage(type)

Return the document image as a Buffer.

### Parameters

| Name | Types                | Description              |
| ---- | -------------------- | ------------------------ |
| type | "png", "jpg", "webp" | type of image to export. |

### Returns

Promise.&lt;Buffer&gt;
image as a Buffer.

## isInitialized()

Wait for window to be initialized



### Returns

Promise.&lt;true&gt;
true when Photopea is ready

## loadAsset(buff)

Open a file in Photopea.

### Parameters

| Name | Types  | Description                 |
| ---- | ------ | --------------------------- |
| buff | Buffer | file to load into Photopea. |

### Returns

Promise.&lt;true&gt;
true, once the file is loaded.

## logMessage(msg)

Log a message.

### Parameters

| Name | Types  | Description          |
| ---- | ------ | -------------------- |
| msg  | string | Line to save to log. |

### Returns

void


## openFromURL(url, asSmart)

Open a file in Photopea from a URL.

### Parameters

| Name    | Types   | Description                                             |
| ------- | ------- | ------------------------------------------------------- |
| url     | *       | url of asset. make sure it can be accessed cross-origin |
| asSmart | boolean | open as smart object?                                   |

### Returns

Promise.&lt;true&gt;
true, once the file is opened.

## runScript(script)

Run a script in Photopea.

### Parameters

| Name   | Types  | Description    |
| ------ | ------ | -------------- |
| script | string | script to run. |

### Returns

Array
output from Photopea, ending with "done". All ArrayBuffers will be converted to base 64 strings.

## screenshot(fName)

Save a debugging screenshot to file

### Parameters

| Name  | Types  | Description                    |
| ----- | ------ | ------------------------------ |
| fName | string | Absolute path name of the file |

### Returns

Promise.&lt;void&gt;

Documentation generated with [doxdox](https://github.com/docsbydoxdox/doxdox)

Generated on Tue Dec 23 2025 11:13:32 GMT-0500 (Eastern Standard Time)
