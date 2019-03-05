Sub Assignment2()

Dim vol As Double
Dim ticker1 As String
Dim ticker2 As String
Dim ticker3 As String
Dim year_change_open As Double
Dim year_change_close As Double
Dim percent_high As Double
Dim percent_low As Double
Dim greatest_increase As Double
Dim greatest_descrease As Double
Dim greatest_total As Double
Dim OpenTicker As Double
Dim CloseTicker As Double

vol = 0
 j = 2
 year_change_open = 0
 year_chenge_close = 0
 percent_high = 0
 percent_low = 0

 greatest_increase = Cells(2, 11).Value
 greatest_descrease = Cells(2, 11).Value
 greatest_total = 0
 
 OpenTicker = Cells(2, 3).Value

 numrows = Range("A1", Range("A1").End(xlDown)).Rows.Count



 ticker1 = 0
 ticker2 = 0
 ticker3 = 0
 
 Cells(1, 9).Value = "Ticker"
 Cells(1, 10).Value = "Yearly Change"
 Cells(1, 11).Value = "Percent Change"
 Cells(1, 12).Value = "Total Stock Volume"

 Cells(2, 14).Value = "Greatest % Increase"
 Cells(3, 14).Value = "Greatest % Decrease"
 Cells(4, 14).Value = "Greatest Total Volume"
 Cells(1, 15).Value = "Ticker"
 Cells(1, 16).Value = "Value"
 
 
For i = 2 To numrows

    
    'if the sequenced ticker symbols are equal...
    If Cells(i + 1, 1).Value = Cells(i, 1).Value Then
    'updating vol total
    vol = Cells(i, 7).Value + vol
    'updating Open and Close columns
    year_change_close = Cells(i, 6).Value + year_change_close
    year_change_open = Cells(i, 3).Value + year_change_open
    End If
    
    
    'if the ticker symbols are different...
    If Cells(i + 1, 1).Value <> Cells(i, 1).Value Then
    'place vol in it's cell
    Cells(j, 12).Value = vol
    CloseTicker = Cells(i, 6).Value
    'place Yearly Change in it's cell
    Cells(j, 10).Value = CloseTicker - OpenTicker
    'place Percent Change in it's cell
        If year_change_open <> 0 And OpenTicker <> 0 Then
        Cells(j, 11).Value = (CloseTicker - OpenTicker) / OpenTicker
        OpenTicker = Cells(i + 1, 3).Value
        Else:
        Cells(j, 11).Value = 0
        End If
    'dump the variables back to 0
    vol = 0
    year_change_open = 0
    year_change_close = 0
    percent_low = 0
    percent_high = 0
    'placing the ticker symbols
    Cells(j, 9).Value = Cells(i, 1).Value
    ' index for unique ticker symbol
    j = j + 1
    OpenTicker = Cells(i + 1, 3).Value
    
    End If
    
Next i

numrows = Range("I1", Range("I1").End(xlDown)).Rows.Count

For k = 2 To numrows

    'if the value in column 10 is positive, make the cell green
    If Cells(k, 10).Value > 0 Then
    Cells(k, 10).Interior.ColorIndex = 4
    'if the value in column 10 is negative, make the cell red
    ElseIf Cells(k, 10).Value <= 0 Then
    Cells(k, 10).Interior.ColorIndex = 3
    
    End If

    'finding the Greatest Total Volume'
    'if current index is > current greatest_total...'
    If Cells(k, 12).Value > greatest_total Then
    'current index becomes new greatest_total'
    greatest_total = Cells(k, 12).Value
    'grab the ticker symbol at same index'
    ticker1 = Cells(k, 9).Value
    'put greatest_total value in cell'
    Cells(4, 16).Value = greatest_total
    'put ticker1 value in cell'
    Cells(4, 15).Value = ticker1
    End If

    'finding the Greatest % Increase'
    'if current index is > current greatest_increase...'
    If Cells(k, 11).Value > greatest_increase Then
    'current index becomes new greatest_increase'
    greatest_increase = Cells(k, 11).Value
    'grab ticker symbol at same index'
    ticker2 = Cells(k, 9).Value
    'put greatest_increase value in cell'
    Cells(2, 16).Value = greatest_increase
    'put ticker2 value in cell'
    Cells(2, 15).Value = ticker2
    End If

    'finding the Greatest % Decrease'
    'if current index is < current greatest_decrease...'
    If Cells(k, 11).Value < greatest_decrease Then
    'current index becomes new greatest_decrease'
    greatest_decrease = Cells(k, 11).Value
    'grab ticker symbol at same index'
    ticker3 = Cells(k, 9).Value
    'put greatest_decrease value in cell'
    Cells(3, 16).Value = greatest_decrease
    'put ticker3 value in cell'
    Cells(3, 15).Value = ticker3
    End If

    
Next k

End Sub
