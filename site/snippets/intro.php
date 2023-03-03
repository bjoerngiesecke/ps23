<div id="intro">
    <img id="intro-image" src="<?= page('frontpage')->files()->shuffle()->first()->url() ?>">
    <p id="intro-text">
        <?= page('frontpage')->about() ?>
    </p>
</div>