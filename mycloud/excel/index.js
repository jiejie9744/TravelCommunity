const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-7el9z'
})
var xlsx = require('node-xlsx');
const db = cloud.database()

exports.main = async(event, context) => {
  let {
    fileID
  } = event
  //1,通过fileID下载云存储里的excel文件
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent

  var collegeName = [
    "材料与能源学院", "管理学院", "机电工程学院", "计算机学院",
    "建筑与城市规划学院", "经济与贸易学院", "轻工化工学院", "土木与交通工程学院",
    "物理与光电工程学院", "信息工程学院", "艺术与设计学院", "应用数学学院", "政法学院", "自动化学院"
  ];

  var specialtyName1 = ["材料类", "机械类", "电子商务", "网络工程", "城乡规划", "数据科学与大数据技术"];

  var count1 = 1000;

  var specialtyName2 = ["能源与动力工程", "土木类", "数字媒体技术", "应用统计学", "自动化", "工商管理类", "风景园林"];
  var count2 = 2000;

  var specialtyName3 = ["工业设计", "法学", "工程管理", "数学类", "建筑学", "经济学", "应用化学"];
  var count3 = 3000;

  var specialtyName4 = ["信息管理与信息系统", "国际经济与贸易", "化学工程与工艺", "电子信息类", "金融学类", "食品科学与工程", "会计学"];
  var count4 = 4000;
  //var zhuanye_no = '1000'; //专业号*1+顺序号*3

  const tasks = [] //用来存储所有的添加数据操作
  //2,解析excel文件里的数据，并生成学号
  var sheets = xlsx.parse(buffer); //获取到所有sheets
  sheets.forEach(function(sheet) {
    console.log(sheet['name']);
    for (var rowId in sheet['data']) {
      console.log(rowId);
      var row = sheet['data'][rowId]; //第几行数据
      if (rowId > 0 && row) { //第一行是表格标题，所有我们要从第2行开始读
        var number = '';

        var benke_no = '3'; //本科号*1

        var xingbie_no = row[2]; //性别号*1

        var year_no = '20'; //年份号*2

        var xueyuan = row[6]; //学院*2
        var xueyuan_no = '00'; //学院号*2

        var zhuanye = row[5]; //专业*1
        var zhuanye_no = '0000'; //专业号*1+顺序号*3

        for (var i = 0; i < collegeName.length; i++) {
          if (xueyuan == collegeName[i]) {
            if (i < 10) {
              xueyuan_no = '0' + i;
            } else {
              xueyuan_no = i;
            }
            break;
          }
        }
        for (var i = 0; i < specialtyName1.length; i++) {
          if (zhuanye == specialtyName1[i]) {
            zhuanye_no = count1 + '';
            count1++;
            break;
          }
        }
        for (var i = 0; i < specialtyName2.length; i++) {
          if (zhuanye == specialtyName2[i]) {
            zhuanye_no = count2 + '';
            count2++;
            break;
          }
        }
        for (var i = 0; i < specialtyName3.length; i++) {
          if (zhuanye == specialtyName3[i]) {
            zhuanye_no = count3 + '';
            count3++;
            break;
          }
        }
        for (var i = 0; i < specialtyName4.length; i++) {
          if (zhuanye == specialtyName4[i]) {
            zhuanye_no = count4 + '';
            count4++;
            break;
          }
        }
        number = benke_no + xingbie_no + year_no + xueyuan_no + zhuanye_no;

        //3，把解析到的数据存到excelList数据表里
        const promise1 = db.collection('students')
          .add({
            data: {
              luQuHao: row[0], //录取号
              name: row[1], //姓名
              sex: row[2], //性别
              province: row[3], //省份
              branch: row[4], //科类
              specialty: row[5], //专业
              college: row[6], //学院
              xiaoQu: row[7], //校区
            }
          })
        const promise2 = db.collection('students_no')
          .add({
            data: {
              luQuHao: row[0], //录取号
              name: row[1], //姓名
              sex: row[2], //性别
              province: row[3], //省份
              branch: row[4], //科类
              specialty: row[5], //专业
              college: row[6], //学院
              xiaoQu: row[7], //校区
              student_no: number, //学号
            }
          })
        tasks.push(promise1);
        tasks.push(promise2);
      }
    }
  });

  // 等待所有数据添加完成
  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function(err) {
    return err
  })
  return result
}