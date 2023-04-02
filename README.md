# Module: PenPlotter

## Render mesmerizing line animations on your mirror!

Addapted for SVG support from https://github.com/AdamMoses-GitHub/MMM-ImageSlideshow

The `MMM-PenPlotter` module is designed to display SVG animations. The SVG files are animated using CSS styling. The animation progressively draws a white line on a black background until it completes the entire SVG path. This creates the illusion that the line is magically rendered on the mirrored glass.

This module includes 12 ready-to-go animations. See a few examples below.

https://user-images.githubusercontent.com/19673807/218282244-71102f43-2679-4f0d-b562-df4aeac87be8.mp4

https://user-images.githubusercontent.com/19673807/218282163-9e663652-8177-4c19-82dd-b85fd84c9b77.mp4

https://user-images.githubusercontent.com/19673807/218282171-3bc547f3-dce7-4fbb-9878-da379b57f2cb.mp4

https://user-images.githubusercontent.com/19673807/218282236-0cef1900-dac9-4945-abe8-9296ac900285.mp4

https://user-images.githubusercontent.com/19673807/218282240-08a0646f-8903-48aa-97ac-51a64322afe1.mp4

## Build Your own Animations 
https://jbamford.github.io/Animate-SVG-Files-Breakdown/
Accpeting pull requests

## Inspiration
Sisyphus, PenPlotters, and
https://www.youtube.com/watch?v=7i78DSaMhls

Additional documention comming on how to generate your own SVG animations. 

## Dependencies / Requirements

This module requires no special dependencies. The only requirement is that the image directories you path to are fixed paths accessible to the Magic Mirror instance.

## Operation

This module will take in a list of directory paths, one or more, containing the SVG files. The module will display those images in either alphabetical or random order, across either each path one at time or across all the paths at once. Once all the images have been shown, it will loop back and start again.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-PenPlotter',
		position: 'middle_center',
		config: {
			imagePaths: ['modules/MMM-PenPlotter/example_svg']
		}
	}	
]
````

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>	
		<tr>
			<td><code>imagePaths</code></td>
			<td>Array value containing strings. Each string should be a path to a directory where image files can be found.<br>
				<br><b>Example:</b> <code>['modules/MMM-ImageSlideshow/example1']</code>
				<br>This value is <b>REQUIRED</b>
			</td>
		</tr>		
		<tr>
			<td><code>slideshowSpeed</code></td>
			<td>Integer value, the length of time to show one image before switching to the next, in milliseconds. Make sure all the SVG animations are the same duration as the slideshowSpeed<br>
				<br><b>Example:</b> <code>6000</code>
				<br><b>Default value:</b> <code>65000</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>delayUntilRestart</code></td>
			<td>Integer value, the length of time to restart the slideshow after the last image has been shown, in milliseconds. The module will go blank will waits to restart. This value defaults to zero, meaning no delay until restarting.<br>
				<br><b>Example:</b> <code>6000</code>
				<br><b>Default value:</b> <code>0</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>		
		<tr>
			<td><code>fixedImageWidth</code></td>
			<td>Integer value, sets a fixed pixel width for all the images to be shown. If set to 0, the image's actual width is used.<br>
				<br><b>Example:</b> <code>250</code>
				<br><b>Default value:</b> <code>0</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
		<tr>
			<td><code>fixedImageHeight</code></td>
			<td>Integer value, sets a fixed pixel height for all the images to be shown. If set to 0, the image's actual height is used.<br>
				<br><b>Example:</b> <code>300</code>
				<br><b>Default value:</b> <code>0</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>        
		<tr>
			<td><code>randomizeImageOrder</code></td>
			<td>Boolean value, if true will randomize the order of the images, if false will use an alphabetical sorting by filename.<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default value:</b> <code>false</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>   
        <tr>
			<td><code>treatAllPathsAsOne</code></td>
			<td>Boolean value, if true will treat all the paths specified in <code>imagePaths</code> as one path. Otherwise, if false, images will only be shown from one path at a time in the order of <code>imagePaths</code>, until all the images in that path are exhausted, before continuing to the next path.<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default value:</b> <code>false</code>
				<br>This value is <b>OPTIONAL</b>
			</td>
		</tr>
        <tr>       
    </tbody>
</table>
