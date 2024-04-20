# headlessphotopea

> Use the Photopea API invisibly.

## addBinaryAsset(buff)

Open a file in Photopea.

### Parameters

| Name | Types  | Description                 |
| ---- | ------ | --------------------------- |
| buff | Buffer | file to load into Photopea. |

### Returns

boolean
true, once the file is loaded.

## changeLayerColor(r, g, b)

Change the color of a Color Fill layer.

### Parameters

| Name | Types  | Description |
| ---- | ------ | ----------- |
| r    | number | Red         |
| g    | number | Green       |
| b    | number | Blue        |

### Returns

Array
[ 'done' ]

## destroy()

Kill this window.





## emergencyRestart()

Restart the browser in an emergency situation.





## isInitialized()

Wait for window to be initialized



### Returns

boolean
true when Photopea is ready

## logMessage(msg)

Log a message.

### Parameters

| Name | Types  | Description          |
| ---- | ------ | -------------------- |
| msg  | string | Line to save to log. |



## openFromURL(url, asSmart)

Open a file in Photopea from a URL.

### Parameters

| Name    | Types   | Description                                             |
| ------- | ------- | ------------------------------------------------------- |
| url     | *       | url of asset. make sure it can be accessed cross-origin |
| asSmart | boolean | open as smart object?                                   |

### Returns

void


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

Documentation generated with [doxdox](https://github.com/docsbydoxdox/doxdox)

Generated on Sat Apr 20 2024 14:56:33 GMT-0400 (Eastern Daylight Time)
