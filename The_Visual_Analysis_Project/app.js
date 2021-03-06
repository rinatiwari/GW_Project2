// console.log("test");
// ​
// d3.json("https://gwprojectflask.herokuapp.com/api/data/results").then(function(results) {
//   questionno = results.map(r => r.QuestionNo);
//   numcorrect = results.map(r => r.NumCorrect);
//   numattempted = results.map(r => r.NumAttempted);
// })
// ​
d3.json("https://gwprojectflask.herokuapp.com/api/data/newresults").then(function(newresults) {
  numberofattempts = newresults.map(nr => nr.numberOFattempts);
  questionsAnswered = newresults.map(nr => nr.questionsAnswered);
  pctcorrect1 = newresults.map(nr => nr.pctCorrect );
  numcorrect1 = newresults.map(nr => nr.numCorrect);
  numincorrect = newresults.map(nr => nr.numIncorrect);
  avgScore = newresults.map(nr => nr.avgScore);

var values = [
  numberofattempts,
  questionsAnswered,
  numcorrect1,
  numincorrect,
  pctcorrect1,
  avgScore]


  var data5 = [{
    type: 'table',
    header: {
      values: [["<b>Number of Attempts</b>"], ["<b>Questions Answered</b>"],
          ["<b>Correctly Answered</b>"], ["<b>Inorrectly Answered</b>"],
          ["<b>Percent Correct</b>"], ["<b>Average Score</b>"]],
      align: "center",
      line: {width: 1, color: 'black'},
      fill: {color: "grey"},
      font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
      values: values,
      align: "center",
      line: {color: "black", width: 1},
      font: {family: "Arial", size: 11, color: ["black"]}
      }
    }]
  
    var layout5 = {
      title: "Result Totals",
      height: 250,
      hoverlabel: { bgcolor: "#FFF" }        
      }

    var config5 = {responsive: true}

Plotly.newPlot('table2', data5, layout5, config5);

});
//
  d3.json("https://gwprojectflask.herokuapp.com/api/data/resultsavg").then(function(resultsavg) {
    question_num = resultsavg.map(ra => ra.Question_Num);
    data_type = resultsavg.map(ra => ra.Data_Type);
    chart_type = resultsavg.map(ra => ra.Chart_Type);
    numcorrect = resultsavg.map(ra => ra.numCorrect);
    pctcorrect = resultsavg.map(ra => ra.percent_correct);
    sumcorrect = numcorrect.reduce((a,b) => a+b, 0);
    question_number = resultsavg.map(ra => ra.Question_Num.substring(4,6));
    q_number = resultsavg.map(ra => "Question ".concat(ra.Question_Num.substring(4,6)));

  

  for(var i = 0; i < data_type.length; i++)
  {
    switch(data_type[i]){
      case 'categoryvsvalue':
        data_type[i] = 'Dimension vs Measure'
        break;
      case 'valuevslocation':
        data_type[i] = 'Dimension vs Measure (Location)'
        break;
      case 'valuevstime':
        data_type[i] = 'Dimension vs Measure (Time)'
        break;
      case 'comparison':
        data_type[i] = 'Comparison'
        break;
      case 'valuevsvalue':
        data_type[i] = 'Measure vs Measure'
        break;
      }
    }

   

    // console.log()
 
    // Get Charts related to Different Dimensions for grouped bar chart

  var catVSval = resultsavg.filter(function (el){
    return el.Data_Type == "categoryvsvalue"
  })
      var catVSval_CHARTs = catVSval.map(ra => ra.Chart_Type)
      var catVSval_correct = catVSval.map(ra => ra.numCorrect)
      var catVSval_pct = catVSval.map(ra => ra.percent_correct)

  var catVSvalLOC = resultsavg.filter(function (el){
    return el.Data_Type == "valuevslocation"
  })
      var catVSvalLOC_CHARTs = catVSvalLOC.map(ra => ra.Chart_Type)
      var catVSvalLOC_correct = catVSvalLOC.map(ra => ra.numCorrect)
      var catVSvalLOC_pct = catVSvalLOC.map(ra => ra.percent_correct)

  var catVSvalTIME = resultsavg.filter(function (el){
    return el.Data_Type == "valuevstime"
  })
      var catVSvalTIME_CHARTs = catVSvalTIME.map(ra => ra.Chart_Type)
      var catVSvalTIME_correct = catVSvalTIME.map(ra => ra.numCorrect)
      var catVSvalTIME_pct = catVSvalTIME.map(ra => ra.percent_correct)

  var comparison = resultsavg.filter(function (el){
    return el.Data_Type == "comparison"
  })
      var comparison_CHARTs = comparison.map(ra => ra.Chart_Type)
      var comparison_correct = comparison.map(ra => ra.numCorrect)
      var comparison_pct = comparison.map(ra => ra.percent_correct)

  var valVSval = resultsavg.filter(function (el){
    return el.Data_Type == "valuevsvalue"
  })
      var valVSval_CHARTs = valVSval.map(ra => ra.Chart_Type)
      var valVSval_correct = valVSval.map(ra => ra.numCorrect)
      var valVSval_pct = valVSval.map(ra => ra.percent_correct)

console.log(catVSval_correct);

//----------------------------------------------
//--Bar Chart----Correct Answers by Data Type---
//----------------------------------------------

    var bar1 = {
      x: data_type,
      y: numcorrect,
      type: 'bar',
      text: chart_type,
      name: "Correct Answers",
      hovertemplate:
            "<b>Chart Type: %{text}</b><br>" +
            "Number Correct: %{y:}" +
            "<extra></extra>",
      showlegend: true,
      transforms: [{
        type: "sort",
        target: sumcorrect,
        order: "ascending"
      }],
      textposition: 'auto',
      marker: {
        color: '#00ff00',
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
          }
        }
    }

    var data1 = [bar1];

    var layout1 = {
      title: "Correct Answers by Data Type",
      xaxis: {
        tickangle: -20
      },
      hoverlabel: { bgcolor: "#FFF" },
      legend: {orientation: 'h', text: -0.3},
      hovermode: "closest",
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
      // barmode: "group"
    };
    var config1 = {responsive: true}

    Plotly.newPlot("bar1", data1, layout1, config1);


    //----------------------------------------------
    //--Bar Chart----Correct Answers by Chart Type--
    //----------------------------------------------

    var bar2 = {
      y: chart_type,
      x: numcorrect,
      type: 'bar',
      text: q_number,
      name: "Correct Answers",
      hovertemplate:
            "<b>Question Number: %{text}</b><br>" +
            "Number Correct: %{x:}" +
            "<extra></extra>",
      orientation: 'h',
      // showlegend: true,
      textposition: 'auto',
      marker: {
        color: 'rgb(255,20,147)',
        opacity: 0.5,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
          }
        }
    }

    var data2 = [bar2];

    var layout2 = {
      title: "Correct Answers by Chart Type",
      xaxis: {
        tickangle: -45
      },
      hoverlabel: { bgcolor: "#FFF" },
      legend: {orientation: 'h', text: -0.3},
      hovermode: "closest"
      // barmode: "group"
    };
    var config2 = {responsive: true}

    Plotly.newPlot("bar2", data2, layout2, config2);

    //----------------------------------------------
    //--Table----Breakdown of Current Responses-----
    //----------------------------------------------

    var values = [
      question_number,
      data_type,
      chart_type,
      numcorrect,
      pctcorrect]

      var rowEvenColor = "lightgrey";
      var rowOddColor = "white";

      var data3 = [{
        type: 'table',
        header: {
          values: [["<b>Question Number</b>"], ["<b>Data Type</b>"],
              ["<b>Chart Type</b>"], ["<b>Number Correct</b>"], ["<b>Percent Correct</b>"]],
          align: "center",
          line: {width: 1, color: 'black'},
          fill: {color: "grey"},
          font: {family: "Arial", size: 12, color: "white"},
          columnwidth: [1,7]
        },
        cells: {
          values: values,
          align: "center",
          line: {color: "black", width: 1},
          font: {family: "Arial", size: 11, color: ["black"]},
          fill: {color: [[rowOddColor,rowEvenColor,rowOddColor,
            rowEvenColor,rowOddColor,rowEvenColor,rowOddColor,
            rowEvenColor,rowOddColor,rowEvenColor,rowOddColor,
            rowEvenColor,rowOddColor,rowEvenColor,rowOddColor]]}
          }
        }]
      
        var layout3 = {
          title: "Current Breakdown of Responses",
          height: 650,
          hoverlabel: { bgcolor: "#FFF" },
          // autosize=true        
          }

        var config3 = {responsive: true}

    Plotly.newPlot('table1', data3, layout3, config3);

    //----------------------------------------------
    //--------------Grouped Bar Chart---------------
    //----------------------------------------------

    var data4 = [
          {
            x: catVSval_CHARTs,
            y: catVSval_correct,
            type: "bar",
            name: "Dimension vs Measure", 
            xaxis: 'x1',
            text: catVSval_correct,
            hovertext: catVSval_pct,
            textposition: 'auto',
            marker: {
              color: '#cc3300',
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
                }
              },
            hovertemplate:
            "<b>Percent Correct: %{hovertext:.2f}</b><br>" +
            "Number Correct: %{y:}" +
            "<extra></extra>",
          },
          {
            x: catVSvalLOC_CHARTs,
            y: catVSvalLOC_correct,
            type: "bar",
            name: "Dimension vs Measure (Location)", 
            xaxis: 'x2',
            text: catVSvalLOC_correct,
            hovertext: catVSvalLOC_pct,
            textposition: 'auto',
            marker: {
              color: '#0066ff',
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
                }
              },
            hovertemplate:
            "<b>Percent Correct: %{hovertext:.2f}</b><br>" +
            "Number Correct: %{y:}" +
            "<extra></extra>",
          },
          {
            x: catVSvalTIME_CHARTs,
            y: catVSvalTIME_correct,
            type: "bar",
            name: "Dimension vs Measure (Time)", 
            xaxis: 'x3',
            text: catVSvalTIME_correct,
            hovertext: catVSvalTIME_pct,
            textposition: 'auto',
            marker: {
              color: '#CCF',
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
                }
              },
            hovertemplate:
            "<b>Percent Correct: %{hovertext:.2f}</b><br>" +
            "Number Correct: %{y:}" +
            "<extra></extra>",
          },
          {
            x: comparison_CHARTs,
            y: comparison_correct,
            type: "bar",
            name: "Comparison",
            xaxis: 'x4',     
            text: comparison_correct,
            hovertext: comparison_pct,
            textposition: 'auto',
            marker: {
              color: '#080',
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
                }
              },
            hovertemplate:
            "<b>Percent Correct: %{hovertext:.2f}</b><br>" +
            "Number Correct: %{y:}" +
            "<extra></extra>",
          },
          {
            x: valVSval_CHARTs,
            y: valVSval_correct,
            type: "bar",
            name: "Measure vs Measure",
            xaxis: 'x5',     
            text: valVSval_correct,
            hovertext: valVSval_pct,
            textposition: 'auto',
            marker: {
              color: '#ff9900',
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
                }
              },
            hovertemplate:
            "<b>Percent Correct: %{hovertext:.2f}</b><br>" +
            "Number Correct: %{y:}" +
            "<extra></extra>",
        },
         ]

    var layout4 = {
          title: "Current Breakdown of Responses",
          // height: 400,
          hoverlabel: { bgcolor: "#FFF" },
          legend: {orientation: 'h', text: -0.3},
          hovermode: "closest",
          
          xaxis:{
                  domain: [0, 0.27],
                  anchor: 'x1',
                  hoverformat: '.2f', 
                  // title: 'Dimension vs Measure'
                },
                xaxis2: {
                  domain: [0.28, 0.42],
                  anchor: 'x2', 
                  // title: 'Dimension vs Measure (Location)'
                },
                xaxis3: {
                  domain: [0.43, 0.63],
                  anchor: 'x3', 
                  // title: 'Dimension vs Measure (Time)'
                },
                xaxis4: {
                  domain: [0.64, 0.84],
                  anchor: 'x4', 
                  // title: 'Comparison'
                },
                xaxis5: {
                  domain: [0.85, 1.0],
                  anchor: 'x5', 
                  // title: 'Measure vs Measure'
                }        
          }

          var config4 = {responsive: true}

          Plotly.newPlot('bar3', data4, layout4, config4);






  });

  
// }