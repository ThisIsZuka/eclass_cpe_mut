<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <?php
        echo assets_js('aegis_js/manage_te/te_subject.js');
        echo assets_js('jquery_js/jquery-ui.js');
        ?>

        <style>
                .placeholder {
                        border: 2.5px double gray;
                        /* background-color: white; */
                        -webkit-box-shadow: 0px 0px 10px #888;
                        -moz-box-shadow: 0px 0px 10px #888;
                        box-shadow: 0px 0px 10px #888;
                }
        </style>
</head>

<body>
        <?php

        //$this->session->unset_userdata('ses_permission');

        //print_r($this->session->userdata());
        ?>
        <!-- Modal -->
        <div class="modal fade" id="Modal_Add_subject" tabindex="-1" role="dialog" aria-labelledby="Modal_Add_subject" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h4 class="modal-title">เพิ่มข้อมูลวิชาที่เปิดสอนประจำเทอม</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <form id="Subject_semester_Form_add">
                                        <div class="modal-body">
                                                <form class="needs-validation" novalidate>
                                                        <div class="form-row">
                                                                <div class="col-sm-3 mb-2">
                                                                        <label>Semester</label>
                                                                        <select class="form-control" id="Semester_Form_add_option">

                                                                        </select>
                                                                </div>
                                                                <div class="col-sm mb-2">
                                                                        <label>Subject</label>
                                                                        <select class="form-control" id="Subject_Form_add_option">

                                                                        </select>
                                                                </div>
                                                        </div>

                                                        <div class="form-row mt-3">
                                                                <div class="col-sm-3 mb-2">
                                                                        <div class="custom-control custom-switch mb-2">
                                                                                <input class="custom-control-input" id="customSwitch" type="checkbox">
                                                                                <span class="custom-control-track"></span>
                                                                                <label class="custom-control-label" for="customSwitch">เพิ่มวิชาร่วม</label>
                                                                        </div>


                                                                </div>
                                                        </div>

                                                        <div class="form-row mt-1" id="Class_Join">
                                                                <!-- <div class="col-sm mb-1">
                                                                        <label>Subject</label>
                                                                        <select class="form-control" id="SubjectJoin_add_option">

                                                                        </select>
                                                                </div> -->
                                                                <div class="col-sm mb-1">
                                                                        <form>
                                                                                <div class="form-group">
                                                                                        <label for="SubjectJoin_add_option">เพิ่มรายวิชาเรียนร่วม</label>
                                                                                        <select class="form-control" id="SubjectJoin_add_option">

                                                                                        </select>
                                                                                        <span style="font-size: 1.5rem;" id="add_Subjoin">
                                                                                                <span style="color: #ff4081;">
                                                                                                        <a><i class="fas fa-plus-circle"></i></a>
                                                                                                </span>
                                                                                        </span>
                                                                                </div>
                                                                                <div class="form-group">
                                                                                        <label for="SubjectJoin">รายวิชาเรียนร่วมที่เพิ่ม</label>
                                                                                        <select multiple class="form-control" id="SubjectJoin">

                                                                                        </select>
                                                                                </div>
                                                                        </form>
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                </form>
                                <div class="modal-footer">
                                        <button type="button" id="btnCloseAdd" class="btn btn-default" data-dismiss="modal">ปิด</button>
                                        <button type="button" id="btnSave" class="btn btn-primary">เพิ่มวิชา</button>
                                </div>
                        </div>
                </div>
        </div>
        <!-- End Modal -->

        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-chalkboard"></i></span>
                                <span style="font-size: 0.8em;">
                                        &nbsp; รายวิชา
                                </span>
                        </div>
                        <!-- <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn btn-secondary my-2 my-sm-0" type="submit">
                                <span style="font-size: 1.1em;">
                                        <i class="fas fa-search"></i></span>
                                &nbsp;ค้นหา
                        </button>
                </form> -->
                        <form class="form-inline">
                                <select name="yearterm" id="yearterm" class="form-control">

                                </select>

                        </form>
                </nav>

                <div class="container-fluid mx-auto">
                        <div calss="mt-3"> วิชาหลัก </div>
                        <div class="card-deck mt-3" id="showSubject">
                        </div>
                        <div class="navdrawer-divider"></div>
                        วิชาช่วยสอน
                        <div class="card-deck mt-3" id="showSubject_assist">
                        </div>
                </div>
</body>

</html>