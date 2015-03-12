<?php

foreach (new DirectoryIterator('.') as $fileInfo) {
	if($fileInfo->isDir() and ! $fileInfo->isDot()){
    		echo "<a href=\"" . $fileInfo->getFilename() . "\">" . $fileInfo->getFilename() . "</a><br>\n";
	}
}

?>
