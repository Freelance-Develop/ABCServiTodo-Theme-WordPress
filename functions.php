<?php
    if ( ! function_exists( 'jtabcst_scripts' ) ) :
        function jtabcst_scripts() {
            wp_enqueue_style(
                'jango-css',
                get_template_directory_uri(). '/dist/assets/css/master.min.css'
            );
            wp_enqueue_script(
                'jango-js',
                get_theme_file_uri( '/dist/assets/js/build.min.js' ),
                array(),
                '0.1',
                true
            );
        }
        add_action( 'wp_enqueue_scripts', 'jtabcst_scripts' );
    endif; // jtabcst_scripts
?>
