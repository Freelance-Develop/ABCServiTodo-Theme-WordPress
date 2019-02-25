<?php
    if ( ! function_exists( 'jango_scripts' ) ) :
        function jango_scripts() {
            wp_enqueue_style(
                'jango-css',
                get_template_directory_uri(). '/dist/assets/css/master.min.css'
            );
        }
        add_action( 'wp_enqueue_scripts', 'jango_scripts' );
    endif; // jango_scripts
?>
