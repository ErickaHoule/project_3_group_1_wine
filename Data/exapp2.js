$(document).ready(function() {
    let trace1 = {
        x: red_wineries,
        y: red_points,
        type: "bar",
        name: "Red Wineries",
        marker: {
            color: "#743039",
        }
    };

    let trace2 = {
        x: white_wineries,
        y: white_points,
        type: "bar",
        name: "White Wineries",
        marker: {
            color: "#EEEDC4",
        }
    };

    // Create data array
    let traces = [trace1, trace2];

    // Apply a title to the layout
    let layout = {
        height: 500,
        width: 850,
        margin: {
            l: 70,
            r: 50,
            b: 150,
            t: 70,
            pad: 4
        },
        title: "Top 10 Wineries By Average Points",
        xaxis: {
            tickangle: -45,
            title: "Wineries"
        },
        yaxis: {
            title: "Average Points"
        },
        barmode: 'group'
    };

    Plotly.newPlot('bar', traces, layout);
});