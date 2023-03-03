<div id="tags">
	<?php

	$TAGS = array();
	$projects = page('projects')->children();

	function existInArray($array, $key, $val) {
    foreach ($array as $index=>$item) {
    	if (isset($item[$key]) && $item[$key] == $val) {
      	return $index;
      }
    }
    return false;
	}

	function array_unique_multidimensional($input) {
    $serialized = array_map('serialize', $input);
    $unique = array_unique($serialized);
    return array_intersect_key($input, $unique);
	}

	function getTitleTag($projects, $TAGS) {

		foreach ($projects as $project) {
			$title = (string)$project->title();
			$elements = $project->files()->count();

			$TAGS[] = array('name' => $title, 'number' => $elements);
		}

		return $TAGS;
	}

	function getYearTag($projects, $TAGS) {

		foreach ($projects as $project) {
			$title = (string)$project->year();
			$elements = $project->files()->count();

			$exist = existInArray($TAGS, 'name', $title);

			if ($exist) {
				$TAGS[$exist]['number'] += $elements;
			} else {
				$TAGS[] = array('name' => $title, 'number' => $elements);
			}
		}

		return $TAGS;
	}

	function getLocationTag($projects, $TAGS) {

		foreach ($projects as $project) {
			$title = (string)$project->location();
			$elements = $project->files()->count();

			$exist = existInArray($TAGS, 'name', $title);

			if ($exist) {
				$TAGS[$exist]['number'] += $elements;
			} else {
				$TAGS[] = array('name' => $title, 'number' => $elements);
			}
		}

		return $TAGS;
	}

	function getImageTypeTag($projects, $TAGS) {
		$data = array();
		$temp = '';

		foreach ($projects as $project) {
			$files = $project->files();
			
			foreach ($files as $item) {
				if ($item->ImageType()->isNotEmpty()) {
					// if there is more than on is split using ", "
					$temp .= $item->ImageType() . ", ";
				}
			}
		}

		if ($temp !== '') {
			$temp = substr($temp, 0, -2);
			$data = explode(', ', $temp);
		}

		foreach ($data as $d) {
			$count = 0;
			foreach ($data as $current) {
				if ($current==$d) {
					$count++;
				}
			}
			$TAGS[] = array('name' => $d, 'number' => $count);
		}

		return $TAGS;
	}

	function getMaterialsTag($projects, $TAGS) {
		$data = array();
		$temp = '';

		foreach ($projects as $project) {
			$files = $project->files();
			
			foreach ($files as $item) {
				if ($item->Materials()->isNotEmpty()) {
					// if there is more than on is split using ", "
					$temp .= $item->Materials() . ", ";
				}
			}
		}

		if ($temp !== '') {
			$temp = substr($temp, 0, -2);
			$data = explode(', ', $temp);
		}

		foreach ($data as $d) {
			$count = 0;
			foreach ($data as $current) {
				if ($current==$d) {
					$count++;
				}
			}
			$TAGS[] = array('name' => $d, 'number' => $count);
		}

		return $TAGS;
	}

	function getCollaboratorsTag($projects, $TAGS) {
		$data = array();
		$temp = '';

		foreach ($projects as $project) {
			$files = $project->files();
			
			foreach ($files as $item) {
				if ($item->Collaborators()->isNotEmpty()) {
					// if there is more than on is split using ", "
					$temp .= $item->Collaborators() . ", ";
				}
			}
		}

		if ($temp !== '') {
			$temp = substr($temp, 0, -2);
			$data = explode(', ', $temp);
		}

		foreach ($data as $d) {
			$count = 0;
			foreach ($data as $current) {
				if ($current==$d) {
					$count++;
				}
			}
			$TAGS[] = array('name' => $d, 'number' => $count);
		}

		return $TAGS;
	}

	function getFileTypeTag($projects, $TAGS) {
		$data = array();
		$temp = '';

		foreach ($projects as $project) {
			$files = $project->files();
			
			foreach ($files as $item) {
				if ($item->FileType()->isNotEmpty()) {
					// if there is more than on is split using ", "
					$temp .= $item->FileType() . ", ";
				}
			}
		}

		if ($temp !== '') {
			$temp = substr($temp, 0, -2);
			$data = explode(', ', $temp);
		}

		foreach ($data as $d) {
			$count = 0;
			foreach ($data as $current) {
				if ($current==$d) {
					$count++;
				}
			}
			$TAGS[] = array('name' => $d, 'number' => $count);
		}

		return $TAGS;
	}

	function getKeywordsTag($projects, $TAGS) {
		$data = array();
		$temp = '';

		foreach ($projects as $project) {
			$files = $project->files();
			
			foreach ($files as $item) {
				if ($item->Keywords()->isNotEmpty()) {
					// if there is more than on is split using ", "
					$temp .= $item->Keywords() . ", ";
				}
			}
		}

		if ($temp !== '') {
			$temp = substr($temp, 0, -2);
			$data = explode(', ', $temp);
		}

		foreach ($data as $d) {
			$count = 0;
			foreach ($data as $current) {
				if ($current==$d) {
					$count++;
				}
			}
			$TAGS[] = array('name' => $d, 'number' => $count);
		}

		return $TAGS;
	}

	function getTextTag($projects, $TAGS) {
		$count = 0;
		foreach ($projects as $project) {
			if ($project->text()->isNotEmpty()) {
				$count++;
			}
		}
		$TAGS[] = array('name' => 'txt', 'number' => $count);

		return $TAGS;
	}

	$TAGS = getTitleTag($projects, $TAGS);
	$TAGS = getMaterialsTag($projects, $TAGS);
	$TAGS = getKeywordsTag($projects, $TAGS);
	$TAGS = getCollaboratorsTag($projects, $TAGS);
	$TAGS = getLocationTag($projects, $TAGS);
	$TAGS = getYearTag($projects, $TAGS);
	$TAGS = getImageTypeTag($projects, $TAGS);
	$TAGS = getFileTypeTag($projects, $TAGS);
	$TAGS = getTextTag($projects, $TAGS);

	// remove duplicates
	// $TAGS = array_unique($TAGS, SORT_REGULAR);
	$TAGS = array_unique_multidimensional($TAGS);

	foreach ($TAGS as $tag) {
		$title = $tag['name'];
		$number = $tag['number'];

		$identifier = (str_replace(' ', '-', strtolower($tag['name'])));
		
		?>

		<span class="no-break select" onclick="displayImages('<?php echo $identifier ?>')"><span class="tag" id="<?php echo $identifier ?>" href="#"><?php echo $title ?></span> (<span class="quantity"><?php echo $number ?></span>)</span>

		<?php
	}


	?>
</div>