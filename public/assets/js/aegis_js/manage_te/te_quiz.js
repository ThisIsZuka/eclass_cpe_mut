$(document).ready(function () {

    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('แบบทดสอบ : ' + subject_id + ' - ' + year + '/' + part);

    var url = $(location).attr('href').split("/");
    selectMenuPoint();
    showMenuQuiz();
    var editMenuId = '';
    var fieldSaveUrl = '';
    var getField = [];
    var getUnit = [];
    var getMenuPoint = [];
    var exportMenuQuiz = '';
    var idMenu = 0;

    var goValidate = [
        //TEXTBOX_ID ,NUMBER
        ['#menuExportMn', 10], 
        ['#menuExportTxt', 4]
    ];

    var clearPoint = '0';
    $('#choiceQuizPoint').val(clearPoint);

    $('#summernote').summernote({
        placeholder: 'รายละเอียดช่องแบบทดสอบ',
        // tabsize: 1,
        height: 250,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            // ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });

    $('#summernote').summernote('code', '');

    function SnackCall(SnackText) {
        Snackbar.show({
            actionText: 'close',
            pos: 'top-center',
            actionTextColor: '#4CAF50',
            backgroundColor: '#323232',
            width: 'auto',
            text: SnackText
        });
    }

    function selectMenuPoint() {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_point/showMenuPoint/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                console.log(response);
                getMenuPoint = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].point_id + '">' + response[i].point_name + '</option>';
                    }
                }
                $('#menuPoint').html(html);
            }
        });
    }

    function exportPoint() {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_quiz/exportPoint/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                console.log(response);
                getMenuPoint = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].point_id + '">' + response[i].point_name + '</option>';
                    }
                }
                $('#menuPoint').html(html);
            }
        });
    }

    $('#exportSave').click(function (e) {
        menuPointId = $('#menuPoint :selected').val();
        exportText = $('#menuExportTxt').val();
        exportMini = $('#menuExportMn').val();
        exportMax = $('#menuExportMax').val();

        exportCheck = false;

        $.ajax({
            url: '/' + url[3] + '/Te_subject_point/showPointField/' + subject_id + '-' + semester + '-' + menuPointId,
            dataType: "json",
            success: function (response) {
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) {
                        if (exportText == response[i].setpoint_mininame) {
                            $('#exportSame').text('*ชื่อนี้ถูกใช้ไปแล้ว');
                            exportCheck = false;
                            break;
                        } else {
                            exportCheck = true;
                        }
                    }
                } else {
                    exportCheck = true;
                }

                if (exportCheck == true) {
                    $.ajax({
                        type: "POST",
                        url: '/' + url[3] + '/Te_subject_quiz/exportPoint/',
                        //data: '&semester=' + semester + '&subject=' + subject_id + '&menuPoint=' + menuPointId + '&menuQuiz=' + exportMenuQuiz + '&exportText=' + exportText + '&exportMax=' + exportMax,
                        data: {
                            semester: semester,
                            subject: subject_id,
                            menuPoint: menuPointId,
                            menuQuiz: exportMenuQuiz,
                            exportText: exportText,
                            exportMini: exportMini,
                            exportMax: exportMax
                        },
                        dataType: "json",
                        success: function (response) {
                            if (response != 0) {
                                SnackCall('ส่งออกข้อมูลสำเร็จ');
                            } else {
                                SnackCall('ส่งออกข้อมูลไม่สำเร็จ : ยังไม่มีนักศึกษาทำแบบทดสอบ');
                            }
                            $('#exportSame').text('');
                            $('#exportData').modal('hide');
                            console.log(response);
                        }
                    });
                }

            }
        });
    });

    $('#exportClose').click(function (e) {
        $('#menuPoint').val(getMenuPoint[0].point_id);
    });

    $('#btnAddQuiz').click(function (e) {
        e.preventDefault();
        $('#Modal').modal('show');
        $('#ModalLabel').text('เพิ่มเมนูแบบทดสอบ');
        $('#summernote').summernote('code', '');
        //$("#PointView").prop("checked", true);
        //todayDate = new Date().toISOString();
        // $('#StartDatePicker').val(todayDate);
        $('#btnModalSave').text('บันทึกข้อมูล');
        iurl = "/" + url[3] + "/Te_subject_quiz/insertMenuQuiz";
    });

    $('#btnModalSave').click(function (e) {
        header = $('#Headtext').val();
        // description = $('#Textarea').val();
        description = $('#summernote').summernote('code');
        menuStatus = '';
        if ($('#checkBox00').prop("checked")) {
            menuStatus += 1
        } else {
            menuStatus += 0
        }
        if ($('#checkBox01').prop("checked")) {
            menuStatus += 1
        } else {
            menuStatus += 0
        }
        if ($('#checkBox02').prop("checked")) {
            menuStatus += 1
        } else {
            menuStatus += 0
        }
        if ($('#checkBox03').prop("checked")) {
            menuStatus += 1
        } else {
            menuStatus += 0
        }

        var form_data = new FormData();
        form_data.append('semester', semester);
        form_data.append('subject', subject_id);
        form_data.append('header', header);
        form_data.append('description', description);
        form_data.append('status', menuStatus);
        form_data.append('editID', editMenuId);

        $.ajax({
            type: "POST",
            url: iurl,
            // data: '&semester=' + semester + '&subject=' + subject_id + '&header=' + header + '&description=' + description + '&status=' + menuStatus + '&editID=' + editMenuId,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function () {
                $('#Headtext').val("");
                $('#Textarea').val("");
                $('#Modal').modal('hide');
                showMenuQuiz();
                SnackCall("บันทึกข้อมูลเมนูสำเร็จ");
            }
        });
    });

    function showMenuQuiz() {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_quiz/showMenuQuiz/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                getMenu = response;
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<div class="expansion-panel list-group-item success-color" >' +
                            '<a aria-controls="collapse' + getMenu[i].menuQuizId + '" aria-expanded="true" class="sortableMenu expansion-panel-toggler collapsed" data1="' + response[i].menuQuizId + '" data-toggle="collapse" href="#collapse' + getMenu[i].menuQuizId + '" id="heading' + getMenu[i].menuQuizId + '">' +
                            response[i].menuQuizName +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="heading' + getMenu[i].menuQuizId + '" class="collapse" data-parent="#accordionOne" id="collapse' + getMenu[i].menuQuizId + '">' +
                            '<div class="expansion-panel-body">' +
                            /* --------BTN-------- */
                            '<span style="font-size: 1.7em;"><a title="สร้างหัวข้อแบบทดสอบ" id="addInMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-plus-square"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="ลบเมนูแบบทดสอบ" id="delMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-trash-alt"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="แก้ไขเมนูแบบทดสอบ" id="editMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-edit"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="่ส่งออกคะแนน" id="exportMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-share-square"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="ดูคะแนนแบบทดสอบ" id="showScoreMenu-' + response[i].menuQuizId + '" href="#" class="f34r-txt-black"><i class="fas fa-star"></a></i></span>&nbsp;' +
                            /* --------BTN-------- */
                            '<br>' +
                            response[i].menuQuizDescription +
                            '<hr>' +
                            '<table class="table table-bordered">' +
                            '<ol id="fieldOlTag-' + response[i].menuQuizId + '">' +

                            '</ol>' +
                            '</table>' +

                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                }
                $('.showMenuQuiz').html(html);
                sortMenu();

                $('#collapse' + idMenu).collapse({
                    toggle: true
                });

                $.each(getMenu, function (i, p) {
                    showHeader(getMenu[i].menuQuizId);
                    $('#addInMenu-' + getMenu[i].menuQuizId).click(function (e) {
                        SMenuID = getMenu[i].menuQuizId;
                        fieldSaveUrl = '/' + url[3] + '/Te_subject_quiz/insertFieldQuiz';
                        $('#addField').modal('show');
                        $('#addFieldLabel').text('Create in menu : ' + getMenu[i].menuQuizName);
                        idMenu = getMenu[i].menuQuizId;
                        // $("input[name=PointMulti]").attr('disabled', false);
                    });
                    $('#exportMenu-' + getMenu[i].menuQuizId).click(function (e) {
                        exportMenuQuiz = getMenu[i].menuQuizId;
                        $('#exportLabel').text('Export menu : ' + getMenu[i].menuQuizName);
                        $('#exportData').modal('show');
                        $('#menuExportTxt').val(getMenu[i].menuQuizName);
                        idMenu = getMenu[i].menuQuizId;
                    });
                    // $('#showInMenu-' + getMenu[i].menuQuizId).click(function(e) {}); use da href
                    // $('#impInMenu-' + getMenu[i].menuQuizId).click(function(e) {});
                    // $('#expInMenu-' + getMenu[i].menuQuizId).click(function(e) {});
                    $('#delMenu-' + getMenu[i].menuQuizId).click(function (e) {
                        takeThisDel = 'delMenu';
                        delPid = getMenu[i].menuQuizId;
                        $("#txtDel").text('Menu:' + getMenu[i].menuQuizName);
                        $("#ModalDelete").modal('show');
                        // pointId = getMenu[i].menuQuizId;
                        // $('#addField').modal('show');
                        // $('#addFieldLabel').text('Create in menu : ' + getMenu[i].menuQuizName);
                    });
                    $('#editMenu-' + getMenu[i].menuQuizId).click(function (e) {
                        e.preventDefault();
                        $('#Headtext').val(getMenu[i].menuQuizName);
                        // $('#Textarea').val(getMenu[i].menuQuizDescription);
                        $('#summernote').summernote('code', getMenu[i].menuQuizDescription);
                        idMenu = getMenu[i].menuQuizId;
                        //$("input[name='PointView'][value='" + response[i].point_StdView + "']").prop('checked', true);
                        // if ($('#checkBox01').prop("checked")) { menuStatus += 1 } else { menuStatus += 0 }
                        // if ($('#checkBox02').prop("checked")) { menuStatus += 1 } else { menuStatus += 0 }
                        // if ($('#checkBox03').prop("checked")) { menuStatus += 1 } else { menuStatus += 0 }
                        if (getMenu[i].menuQuizStatus.substring(0, 1) == '1') {
                            $('#checkBox00').prop("checked", true);
                        } else {
                            $('#checkBox01').prop("checked", false);
                        }
                        if (getMenu[i].menuQuizStatus.substring(1, 2) == '1') {
                            $('#checkBox01').prop("checked", true);
                        } else {
                            $('#checkBox02').prop("checked", false);
                        }
                        if (getMenu[i].menuQuizStatus.substring(2, 3) == '1') {
                            $('#checkBox02').prop("checked", true);
                        } else {
                            $('#checkBox03').prop("checked", false);
                        }
                        if (getMenu[i].menuQuizStatus.substring(3, 4) == '1') {
                            $('#checkBox03').prop("checked", true);
                        } else {
                            $('#checkBox03').prop("checked", false);
                        }

                        $('#ModalLabel').text('แก้ไขเมนูแบบทดสอบ');
                        $('#save').text('ยืนยันการแก้ไข');

                        $('#Modal').modal('show');
                        iurl = "/" + url[3] + "/Te_subject_quiz/editMenuQuiz";
                        editMenuId = getMenu[i].menuQuizId;
                    });
                    $('#showScoreMenu-' + getMenu[i].menuQuizId).click(function (e) {
                        console.log('showScoreMenu-' + getMenu[i].menuQuizId);
                        $("#showScoreModal").modal('show');
                    });
                });
            }
        });
    }

    $('#fieldSave').click(function (e) {
        headerQuizName = $('#addFieldHQN').val();
        if(headerQuizName*1 != 0){
            $.ajax({
                type: "POST",
                url: fieldSaveUrl,
                //data: '&semester=' + semester + '&subject_id=' + subject_id + /*|*/ '&headerQuizName=' + headerQuizName + '&quizId=' + SMenuID + '&headId=' + SHeadID,
                data: {
                    semester: semester,
                    subject_id: subject_id,
                    headerQuizName: headerQuizName,
                    quizId: SMenuID,
                    headId: SHeadID
                },
                success: function () {
                    $('#addFieldHQN').val("");
                    showMenuQuiz();
                    $('#addField').modal('hide');
                    SnackCall("บันทึกข้อมูลเมนูสำเร็จ");
                }
            });
        }else{
            SnackCall("โปรดกรอกหัวข้อแบบทดสอบ");
        }
    });
    var SHeadID = '';

    function showHeader(mQuizId) {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_quiz/showQuizField/' + subject_id + '-' + semester + '-' + mQuizId,
            dataType: "json",
            success: function (response) {
                var html = "";
                if (!getField[mQuizId]) getField[mQuizId] = []
                getField[mQuizId] = response;
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) {
                        html += '<li class=""><h4>' + response[i].headerQuizName + '</h4></li>' +
                            '<span style="font-size: 1.5em;"><a href="#" title="เพิ่มตัวเลือกแบบทดสอบ" id="addChoiceQuiz-' + mQuizId + '-' + response[i].headerQuizId + '"class="f34r-txt-black"><i class="fas fa-plus-square"></i></a></span>&nbsp;' +
                            '<span style="font-size: 1.5em;"><a href="#" title="ลบตัวเลือกแบบทดสอบ" id="delChoiceQuiz-' + mQuizId + '-' + response[i].headerQuizId + '"class="f34r-txt-black"><i class="fas fa-minus-square"></i></a></span>&nbsp;' +
                            '<span style="font-size: 1.5em;"><a href="#" title="แก้ไขตัวเลือกแบบทดสอบ" id="editChoiceQuiz-' + mQuizId + '-' + response[i].headerQuizId + '"class="f34r-txt-black"><i class="fas fa-pen"></i></a></span>&nbsp;' +
                            '<ol id="fieldOlTagChild-' + mQuizId + '-' + response[i].headerQuizId + '">' +
                            '</ol>';
                    }
                } else {
                    html += '<h1>NO DATA</h1>'
                }
                $('#fieldOlTag-' + mQuizId).html(html);
                $.each(getField[mQuizId], function (i, p) {
                    showChoice(mQuizId, getField[mQuizId][i].headerQuizId);
                    //console.log(mQuizId, getField[mQuizId][i].headerQuizId);
                    $('#addChoiceQuiz-' + mQuizId + '-' + getField[mQuizId][i].headerQuizId).click(function (e) {
                        idMenu = mQuizId;
                        //console.log('#addChoiceQuiz-' + mQuizId + '-' + getField[mQuizId][i].headerQuizId);
                        $('#addChoice').modal('show');
                        $('#addChoiceLabel').text('เพิ่มตัวเลือกแบบทดสอบ ' + getField[mQuizId][i].headerQuizName);
                        getMId = mQuizId;
                        getHId = getField[mQuizId][i].headerQuizId;
                        pUrl = '/' + url[3] + '/Te_subject_quiz/insertInFieldChoiceQuiz';
                    });
                    $('#delChoiceQuiz-' + mQuizId + '-' + getField[mQuizId][i].headerQuizId).click(function (e) {
                        //console.log('#delField-' + mQuizId + '-' + getField[mQuizId][i].headerQuizId);
                        $("#txtDel").text('Field:' + getField[mQuizId][i].headerQuizName);
                        $("#ModalDelete").modal('show');
                        idMenu = mQuizId;
                        takeThisDel = "delField";
                        delCid = getField[mQuizId][i].headerQuizId;
                        delPid = mQuizId;
                        //delField(response[i].setpoint_id, response[i].headerQuizId);
                    });
                    $('#editChoiceQuiz-' + mQuizId + '-' + getField[mQuizId][i].headerQuizId).click(function (e) {
                        $('#addFieldHQN').val(getField[mQuizId][i].headerQuizName);
                        $('#addFieldLabel').text('Edit Header : ' + getField[mQuizId][i].headerQuizName);
                        $('#addField').modal('show');
                        idMenu = mQuizId;
                        fieldSaveUrl = '/' + url[3] + '/Te_subject_quiz/updateFieldQuiz';
                        SHeadID = getField[mQuizId][i].headerQuizId;
                        SMenuID = mQuizId;
                    });
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }
    editChoice = qText = qPoint = pUrl = '';

    $('#choiceSave').click(function (e) {
        //console.log(getMId, getHId, '-<');
        qText = $('#choiceQuizText').val();
        qPoint = $('#choiceQuizPoint').val();
        if(qText*1 != 0){ 
            saveHeader();
            $('#addChoice').modal('hide');
        }else{
            SnackCall("โปรดกรอกชื่อตัวเลือก");
        }
    }); 

    function saveHeader() {
        $.ajax({
            type: "POST",
            url: pUrl,
            //data: '&semester=' + semester + '&subject_id=' + subject_id + '&menuId=' + getMId + '&headId=' + getHId + '&choiceQuizText=' + qText + '&choiceQuizPoint=' + qPoint + '&editId=' + editChoice,
            data: {
                semester: semester,
                subject_id: subject_id,
                menuId: getMId,
                headId: getHId,
                choiceQuizText: qText,
                choiceQuizPoint: qPoint,
                editId: editChoice
            },
            dataType: "json",
            success: function (response) {
                $('#choiceQuizPoint').val(clearPoint);
                $('#choiceQuizText').val("");
                SnackCall("บันทึกข้อมูลตัวเลือกแบบทดสอบสำเร็จ");
                showMenuQuiz();
            },
            error: function () {
                $('#choiceQuizPoint').val(clearPoint);
                $('#choiceQuizText').val("");
                SnackCall("บันทึกข้อมูลตัวเลือกแบบทดสอบไม่สำเร็จ");
            }
        });
    }

    function showChoice(CMenuID, CHeaderID) {
        //console.log('headerQuizName');
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_quiz/showQuizChoice/' + subject_id + '-' + semester + '-' + CMenuID + '-' + CHeaderID,
            dataType: "json",
            success: function (response) {
                if (!getUnit[CMenuID]) getUnit[CMenuID] = []
                if (!getUnit[CMenuID][CHeaderID]) getUnit[CMenuID][CHeaderID] = []
                getUnit[CMenuID][CHeaderID] = response;
                var html = "";
                //console.log(response.length);
                if (response.length != undefined) {
                    html += '<table>';
                    for (i = 0; i < response.length; i++) {
                        //f34rNumber = Math.round((response[i].choiceQuizPoint) * 10000) / 10000;

                        html += '<tr>' +
                            '<td><li type="a"><span class="col-8">' + response[i].choiceQuizText + '</span></li></td>' +
                            '<td><span class="text-black-50 col-4">[' + response[i].choiceQuizPoint + ']</span></td>' +
                            '<td><button type="button" id="EditQCBtn-' + CMenuID + '-' + CHeaderID + '-' + response[i].choiceQuizId + '" class="btn btn-outline-success waves-effect">Edit</button>' +
                            '<button type="button" id="DelQCBtn-' + CMenuID + '-' + CHeaderID + '-' + response[i].choiceQuizId + '" class="btn btn-outline-danger waves-effect">Delete</button></td>' +
                            '</tr>';
                    }
                    html += '</table>';
                } else {
                    html += '<div>[ NO DATA ]</div>'
                }
                $('#fieldOlTagChild-' + CMenuID + '-' + CHeaderID).html(html);
                $.each(getUnit[CMenuID][CHeaderID], function (i, p) {
                    console.log(CMenuID, CHeaderID, getUnit[CMenuID][CHeaderID][i].choiceQuizId);

                    $('#EditQCBtn-' + CMenuID + '-' + CHeaderID + '-' + response[i].choiceQuizId).click(function (e) {
                        console.log('EditQCBtn', CMenuID, CHeaderID, getUnit[CMenuID][CHeaderID][i].choiceQuizId);
                        $('#addChoice').modal('show');
                        $('#addChoiceLabel').text('แก้ไขตัวเลือกแบบทดสอบ ' + getUnit[CMenuID][CHeaderID][i].choiceQuizText);
                        $('#choiceQuizText').val(getUnit[CMenuID][CHeaderID][i].choiceQuizText);
                        $('#choiceQuizPoint').val(getUnit[CMenuID][CHeaderID][i].choiceQuizPoint);
                        pUrl = '/' + url[3] + '/Te_subject_quiz/editChoiceQuiz';
                        //console.log(getMId);
                        editChoice = response[i].choiceQuizId;
                        getMId = CMenuID;
                        getHId = CHeaderID;
                        idMenu = CMenuID;
                        // console.log('#addChoiceQuiz-' + mQuizId + '-' + getField[mQuizId][i].headerQuizId);
                        // $('#addChoice').modal('show');
                        // $('#addChoiceLabel').text('เพิ่มตัวเลือกแบบทดสอบ ' + getField[mQuizId][i].headerQuizName);
                    });

                    $('#DelQCBtn-' + CMenuID + '-' + CHeaderID + '-' + response[i].choiceQuizId).click(function (e) {
                        console.log('DelQCBtn', CMenuID, CHeaderID, getUnit[CMenuID][CHeaderID][i].choiceQuizId);
                        $("#txtDel").text('Choice:' + getUnit[CMenuID][CHeaderID][i].choiceQuizText);
                        $("#ModalDelete").modal('show');
                        takeThisDel = "delChoice";
                        delPid = CMenuID;
                        delCid = CHeaderID;
                        delKid = response[i].choiceQuizId;
                        idMenu = CMenuID;
                    });
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }

    $('#choiceClose').click(function (e) {
        e.preventDefault();
        $('#choiceQuizPoint').val(clearPoint);
        $('#choiceQuizText').val("");
    });
 
    var takeThisDel = '';
    var delPid = '';
    var delCid = '';
    var delKid = '';
    $('#Delete').click(function (e) {
        if (takeThisDel == "delChoice") {
            delChoice(delPid, delCid, delKid);
        } else if (takeThisDel == "delField") {
            delField(delPid, delCid);
        } else if (takeThisDel == "delMenu") {
            delMenu(delPid);
        }
        //console.log('DELETED!');

        takeThisDel = '';
        delPid = '';
        delCid = '';
        delKid = '';

        $("#ModalDelete").modal('hide');
    });

    function delChoice(pid, cid, kid) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_quiz/delChoice',
            data: '&semester=' + semester + '&subject=' + subject_id + '&setIdParent=' + pid + '&setIdChild=' + cid + '&setIdKid=' + kid,
            success: function () {
                // console.log('Deleted Successfully');
                SnackCall("ลบตัวเลือกแบบทดสอบสำเร็จ");
                showMenuQuiz();
            }
        });
    }

    function delField(pid, cid) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_quiz/delField',
            data: '&semester=' + semester + '&subject=' + subject_id + '&setIdParent=' + pid + '&setIdChild=' + cid,
            success: function () {
                // console.log('Deleted Successfully');
                SnackCall("ลบตัวหัวข้อแบบทดสอบสำเร็จ");
                showMenuQuiz();
            }
        });
    }

    function delMenu(pid) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_quiz/delMenu',
            data: '&semester=' + semester + '&subject=' + subject_id + '&setIdParent=' + pid,
            success: function () {
                // console.log('Deleted Successfully');
                SnackCall("ลบเมนูแบบทดสอบสำเร็จ");
                showMenuQuiz();
            }
        });
    }

    function sortMenu() {
        var sortMenuIDArray = [];
        var ArraySemester = [];
        var ArraySubject = [];
        $(".DragMenu").sortable({
            tolerance: 'pointer',
            revert: 'invalid',
            placeholder: 'p-2 f34r-bg-n-txt sortableMenu placeholder',
            forceHelperSize: true,
            stop: function() {
                $.map($(this).find('a.sortableMenu'), function(el) {
                    var MenuDowid = $(el).attr('data1');
                    sortMenuIDArray.push(MenuDowid);
                    ArraySubject.push(subject_id);
                    ArraySemester.push(semester);
                });
                console.log(sortMenuIDArray);
                $.ajax({
                    type: "POST",
                    url: '/' + url[3] + '/Te_subject_quiz/SortMenu',
                    data: { sortMenuIDArray, ArraySemester, ArraySubject },
                    success: function() {
                        sortMenuIDArray = [];
                        ArraySemester = [];
                        ArraySubject = [];
                        showMenuQuiz();
                    }
                });
            }
        });
    } 
    scroll = 0;
    $(document).ajaxStop(function () {
        if(scroll > 0){
            $('html, body').animate({scrollTop:$(document).height()}, 'slow');
        }
        validationF34R(goValidate); 
        scroll++;
    });

    //F34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34RF34R 

    function validationF34R(F34RValidate) {
        $.each(F34RValidate, function (i, p) {
            $(F34RValidate[i][0]).keypress(function (event) {
                var ew = event.which;
                if ($(F34RValidate[i][0]).val().length>=F34RValidate[i][1]){
                    return false;
                }
                if (ew == 32)
                    return true;
                if (48 <= ew && ew <= 57)
                    return true;
                if (65 <= ew && ew <= 90)
                    return true;
                if (97 <= ew && ew <= 122)
                    return true;

                return false;
            });
        });
    }
});