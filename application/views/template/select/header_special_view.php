<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title><?php echo lang('title') ?></title>
        <?php
        $multi_assets_css = array(
                'bootstrap_css/material.css',
                'bootstrap_css/material_pugin.css',
                '../fontawesome/css/all.css',
                'aegis_css/cpe-mes.css',
                // 'aegis_css/font_Mitr.css',
                'aegis_css/font_sarabun.css',
                'aegis_css/material-font-icon.css',
                'aegis_css/user.css',
                'snackbar_css/snackbar.min.css'
        );

        $multi_assets_js = array(
                'jquery_js/jquery-3.4.1.js',
                'popper_js/popper.js',
                'bootstrap_js/bootstrap.js',
                'bootstrap_js/material.js',
                'snackbar_js/snackbar.min.js',
                'aegis_js/user_uses.js',
                'aegis_js/langSwitching.js'
        );
        echo assets_css($multi_assets_css);
        echo assets_js($multi_assets_js);
        ?>
</head>

<body class="bg-light h-100" style="font-family: 'Sarabun', sans-serif;">
        <div class="navbar w-100 sticky-top navbar-dark navbar-full doc-navbar-default mainnavbar" style="min-width: 375px; width:100%;">
                <!-- ปุ่มด้านซ้าย -->

                <button aria-controls="navdrawer-left-admin" aria-expanded="false" aria-label="Toggle Navdrawer" class="navbar-toggler menu-left-admin" data-target="#navdrawer-left-admin" data-toggle="navdrawer">
                        <span style="font-size: 1.5em;"><i class="fas fa-bars"></i></span>
                </button>

                <div class="mr-auto">
                        <a href="<?php echo base_url() ?>">
                                <div class="navbar-brand ml-2 mr-2 mt-2 mb-1">
                                        <?php
                                        echo assets_img('logo-white.png', array(
                                                'class' => 'logo_mut d-inline-block align-top',
                                                'height' => '44px',
                                                'width' => 'auto',
                                                'alt' => '',
                                        ));
                                        ?>
                                </div>
                        </a>
                </div>
                <div class="ml-auto" id='langSocket'>
                        <span id='btnLangTh'>
                                <div class="chip chip-action chip-color">
                                        <?php
                                        echo assets_img('th.svg', array(
                                                'class' => 'chip-img',
                                                'alt' => 'Chip Image',
                                        ));
                                        ?>
                                        TH
                                </div>
                        </span>
                        <span id='btnLangEn'>
                                <div class="chip chip-action chip-color">
                                        <?php
                                        echo assets_img('us.svg', array(
                                                'class' => 'chip-img',
                                                'alt' => 'Chip Image',
                                        ));
                                        ?>
                                        EN
                                </div>
                        </span>
                        <!-- ปุ่มด้านขวา -->
                        <button type="button" class="btn btn-sm btn-outline-light btn-toggler-sm" aria-controls="navdrawer-right" aria-expanded="false" aria-label="Toggle Navdrawer" data-target="#navdrawer-right" data-toggle="navdrawer">
                                <?php
                                if (isset($this->session->ses_id)) {
                                        ($this->session->lang == 'en') ? $name_user = $this->session->ses_ename : $name_user = $this->session->ses_tname;
                                        echo  '<a class="title_message">
                                                <span style="font-size: 1.2em;">' . $name_user . ' </span>
                                                &nbsp;
                                                </a>
                                                <span style="font-size: 1.5em;">
                                                        <i class="far fa-user"></i>
                                                </span>';
                                } else {
                                        echo  '<a class="title_message">
                                                <span style="font-size: 1.2em;">'.lang('sign_in').' </span>
                                                &nbsp;
                                                </a>
                                                <span style="font-size: 1.5em;">
                                                        <i class="fas fa-sign-in-alt"></i>
                                                </span>';
                                }
                                ?>
                        </button>
                </div>
        </div>

        <!-- navdrawer ด้านซ้าย -->
        <div class="navdrawer navdrawer-left-admin" id="navdrawer-left-admin" tabindex="-1" style="display: none;" aria-hidden="true">
                <div class="navdrawer-content">
                        <div class="navdrawer-header">
                                <div class="navbar-brand px-0">
                                        <span style="font-size: 1.1em;">
                                                <i class="fas fa-th-list"></i></span>&nbsp;&nbsp;&nbsp;<?=lang('menu')?>
                                </div>

                        </div>
                        <nav class="navdrawer-nav">
                                <a class="nav-item nav-link" href="<?php echo base_url('subject'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-arrow-left"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?=lang('choose_courses')?>
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('Select_Special/annouce/') . $subject_id . '-' . $semester; ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-chalkboard"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?=lang('announce_students')?>
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('Select_Special/score/') . $subject_id . '-' . $semester; ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-star-half-alt"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?=lang('score')?>
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('Select_Special/score_special/') . $subject_id . '-' . $semester; ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-star-half-alt"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?=lang('score_spc')?>
                                        </span>
                                </a>

                                <a class="nav-item nav-link" href="<?php echo base_url('countdown'); ?>" target="_blank">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-stopwatch"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?=lang('stopwatch')?>
                                        </span>
                                </a>
                                <div class="navdrawer-divider"></div>
                                <a class="nav-item nav-link" id="ticket" data-toggle="modal" data-target="#modal_ticket">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-ticket-alt"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?=lang('enter_the_score_code')?>
                                        </span>
                                </a>
                                <div class="navdrawer-divider"></div>
                                <a href="">
                                        <p class="navdrawer-subheader"><i class="fas fa-exclamation-circle"></i>&nbsp;<?=lang('web_manual')?></p>
                                </a>
                        </nav>
                </div>
        </div>

        <!-- navdrawer ด้านขวา -->
        <div class="navdrawer navdrawer-right" id="navdrawer-right" tabindex="-1" style="display: none;" aria-hidden="true">
                <div class="navdrawer-content">
                        <div class="navdrawer-header">
                                <div class="navbar-brand px-0">
                                        <?php
                                        if (isset($this->session->ses_tname)) {
                                                echo '<span style="font-size: 1.1em;">
                                                <i class="far fa-user"></i>
                                                </span>&nbsp;&nbsp;' . $this->session->ses_tname;
                                        } else {
                                                echo '<span style="font-size: 1.1em;">
                                                <i class="fas fa-sign-in-alt"></i>
                                                </span>&nbsp;&nbsp;'.lang('sign_in').'';
                                        }
                                        ?>
                                </div>
                        </div>
                        <nav class="navdrawer-nav">
                                <div class="container">
                                        <?php
                                        if (isset($this->session->ses_tname)) {
                                                echo '<a href="' . base_url('user_uses/sign_out') . '"><button type="button" class="btn btn-danger btn-lg btn-block">'.lang('sign_out').'</button></a>';
                                        } else {
                                                echo '<div class="form-group">
                                                                <div class="floating-label">
                                                                <label for="Username"><i class="fas fa-lock"></i>&nbsp;&nbsp;'.lang('username').'</label>
                                                                <input aria-describedby="UsernameHelp" class="form-control" id="Username" name="Username" placeholder=" '.lang('username_or_id').'" type="text" autocomplete="off">
                                                                <div class="invalid-feedback">
                                                                        '.lang('please_sign_in').'
                                                                </div>
                                                        </div>
                                                </div>
                                                
                                                <div class="form-group">
                                                        <div class="floating-label">
                                                                <label for="Password"><i class="fas fa-key"></i>&nbsp;&nbsp;'.lang('user_pass').'</label>
                                                                <input aria-describedby="PasswordHelp" class="form-control" id="Password" name="Password" placeholder=" '.lang('passuser_or_password').'" type="Password" autocomplete="off">
                                                                <div class="invalid-feedback">
                                                                        '.lang('please_enter_the_code').'
                                                                </div>
                                                        </div>
                                                </div>
                                                <button type="button" id="Signin_btn" class="btn btn-primary btn-lg btn-block">'.lang('sign_in').'</button>';
                                        }
                                        ?>
                                </div>
                        </nav>
                        <div class="container">
                                <div class="navdrawer-divider"></div>
                        </div>
                </div>
        </div>
</body>


</html>