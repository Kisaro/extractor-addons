# Additional Extractors

## About
This repository contains additional functionality for the [Extractor Project](https://github.com/Kisaro/extractor).
Each extractor is contained within a single _nameOfExtractor.js_ file and is either deemed experimental or not useful enough (for a bigger audience) to be packaged with the main extractor project.

## Extractors
This optional repository contains the following extractors:
- **GoogleExtractor**: Show some information about your input based on Google Knowledge Graph.
- **ThkoelnExtractor**: Currently extracts canteen menus of certain cologne universities (TH Köln: Deutz-IWZ,Gummersbach and Universität Köln: UniMensa)

## Installation
Please make sure to have [Extractor](https://github.com/Kisaro/extractor#installation) readily installed.
The following commands assume that you are currently within the extractor main directory:
```bash
cd js/
git clone https://github.com/Kisaro/extractor-addons.git .
```
Next you will need to edit ```<extractor_root>/index.html``` and add a new ```<script>``` tag for each extractor you want to use, before ```<extractor_root>/js/app.js``` is included.
```html
    <script type="text/javascript" src="js/mathextractor.js"></script>
    <script type="text/javascript" src="js/fileextractor.js"></script>
    
    <script type="text/javascript" src="js/newextractor.js"></script> <!-- <- add this line -->
    
    <script type="text/javascript" src="js/app.js"></script>
```
Finally, the new extractors are initialized by adding the following line in the init-function of ```<extractor_root>/js/app.js``` for each extractor (replace NewExtractor with the actual name):
```javascript
		App.extractors.push(MathExtractor);
		App.extractors.push(FileExtractor);
		
		App.extractors.push(NewExtractor); // <- add this line
```
