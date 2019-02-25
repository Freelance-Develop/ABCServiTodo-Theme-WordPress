<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta <?php bloginfo( 'charset' ); ?>>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><?php wp_title( '|', true, 'right' ); ?></title>
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <div class="content">
            <h1>Jango Theme</h1>
            <h4>index.php</h4>
        </div>
    </body>
    <?php wp_footer(); ?>
</html>
