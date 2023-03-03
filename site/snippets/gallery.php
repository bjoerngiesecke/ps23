<div id="gallery">
	<?php

	$projects = page('projects')->children();
	$TAGS = array();

	foreach ($projects as $project) {
		$images = $project->files();

		$titleTag = (str_replace(' ', '-', strtolower($project->title())));
		$yearTag = (str_replace(' ', '-', strtolower($project->year())));
		$locationTag = (str_replace(' ', '-', strtolower($project->location())));

		?>

		<div class="projectResource text" data-alt="<?= $titleTag . ' ' . $yearTag . ' ' . $locationTag?> txt"><?php echo $project->text()->kirbytext(); ?></div>

		<?php

		foreach ($images as $image) {
			// $url = $image->url();

			// general tags
			$title = $project->title();
			$TAGS[] = $title;

			if ($project->year()->isNotEmpty()) {
				$year = $project->year();
				$TAGS[] = $year;

			}

			if ($project->location()->isNotEmpty()) {
				$location = $project->location();
				$TAGS[] = $location;
			}

			// specific tags
			$workType = array();
			if ($image->WorkType()->isNotEmpty()) {
				$workType = $image->WorkType();
				$workType = explode(', ', $workType);
				foreach ($workType as $item) {
					$TAGS[] = $item;
				}
			}

			$imageType = array();
			if ($image->ImageType()->isNotEmpty()) {
				$imageType = $image->ImageType();
				$imageType = explode(', ', $imageType);
				foreach ($imageType as $item) {
					$TAGS[] = $item;
				}
			}

			$materials = array();
			if ($image->Materials()->isNotEmpty()) {
				$materials = $image->Materials();
				$materials = explode(', ', $materials);
				foreach ($materials as $item) {
					$TAGS[] = $item;
				}
			}

			$collaborators = array();
			if ($image->Collaborators()->isNotEmpty()) {
				$collaborators = $image->Collaborators();
				$collaborators = explode(', ', $collaborators);
				foreach ($collaborators as $item) {
					$TAGS[] = $item;
				}
			}

			$fileType = array();
			if ($image->FileType()->isNotEmpty()) {
				$fileType = $image->FileType();
				$fileType = explode(', ', $fileType);
				foreach ($fileType as $item) {
					$TAGS[] = $item;
				}
			}

			$keywords = array();
			if ($image->Keywords()->isNotEmpty()) {
				$keywords = $image->Keywords();
				$keywords = explode(', ', $keywords);
				foreach ($keywords as $item) {
					$TAGS[] = $item;
				}
			}
			
			// Which type of file is?
			if ($image->type() == 'video') { // video
				?>

				<video class="projectResource image video" src="<?= $image->url() ?>" data-alt="<?php 

				$numItems = count($TAGS);
				$i = 0;

				foreach ($TAGS as $tag) {
					if (++$i === $numItems) {
						$tagClass = (str_replace(' ', '-', strtolower($tag)));
						echo "$tagClass";
					} else {
						$tagClass = (str_replace(' ', '-', strtolower($tag)));
						echo "$tagClass ";
					}
				}

				?>" loop></video>

				<?php

				// reset array
				unset($TAGS);
				$TAGS = array();

			} else { // image
				$image100 = $image->srcset('100vw');
				$image300 = $image->srcset('300vw');
				$image600 = $image->srcset('600vw');
				$image900 = $image->srcset('900vw');
				// $image1200 = $image->srcset('1200vw');
				// $image2000 = $image->srcset('2000vw');

				?>

				<img class="projectResource image" onclick="zoomInImage(event)" data-alt="<?php 

				$numItems = count($TAGS);
				$i = 0;

				foreach ($TAGS as $tag) {
					if (++$i === $numItems) {
						$tagClass = (str_replace(' ', '-', strtolower($tag)));
						echo "$tagClass";
					} else {
						$tagClass = (str_replace(' ', '-', strtolower($tag)));
						echo "$tagClass ";
					}
				}

				?>" src="<?= $image->url() ?>" srcset="<?= $image->srcset([100, 300, 600]) ?>" alt="project image">

				<?php 
			
			// reset array
			unset($TAGS);
			$TAGS = array();
			
			} // end of if file type ?>

			<?php

		}
	}

	?>
</div>
<div id="slideshow" onclick="slideshowAction(event)">
	<!-- add images js here -->
</div>