document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate');
    const historyDiv = document.getElementById('history');
    const error1Span = document.getElementById('error1');
    const error2Span = document.getElementById('error2');
    
    let history = [];
    
    function isValidNumber(str) {
        if (str.trim() === '') return false;
        return !isNaN(Number(str)) && isFinite(str);
    }
    
    function clearErrors() {
        error1Span.textContent = '';
        error2Span.textContent = '';
        num1Input.classList.remove('bad');
        num2Input.classList.remove('bad');
    }
    
    function calculate() {
        clearErrors();
        
        const num1Str = num1Input.value;
        const num2Str = num2Input.value;
        const operation = operationSelect.value;
        
        let hasError = false;
        
        if (!isValidNumber(num1Str)) {
            error1Span.textContent = 'Введите число';
            num1Input.classList.add('bad');
            hasError = true;
        }
        
        if (!isValidNumber(num2Str)) {
            error2Span.textContent = 'Введите число';
            num2Input.classList.add('bad');
            hasError = true;
        }
        
        if (hasError) return;
        
        const num1 = Number(num1Str);
        const num2 = Number(num2Str);
        let result;
        let errorMessage = '';
        
        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    errorMessage = 'Ошибка: деление на ноль';
                } else {
                    result = num1 / num2;
                }
                break;
        }
        
        let resultStr;
        if (errorMessage) {
            resultStr = errorMessage;
        } else {
            resultStr = Number.isInteger(result) ? result.toString() : result.toFixed(10).replace(/\.?0+$/, '');
        }
        
        const historyEntry = {
            num1: num1Str,
            num2: num2Str,
            operation: operation,
            result: resultStr,
            timestamp: new Date().toLocaleTimeString()
        };
        
        history.unshift(historyEntry);
        
        if (history.length > 5) {
            history = history.slice(0, 5);
        }
        
        updateHistoryDisplay();
    }
    
    function updateHistoryDisplay() {
        historyDiv.innerHTML = '';
        
        if (history.length === 0) {
            const emptyLine = document.createElement('div');
            emptyLine.className = 'line old';
            emptyLine.textContent = 'История пуста';
            historyDiv.appendChild(emptyLine);
            return;
        }
        
        history.forEach((entry, index) => {
            const line = document.createElement('div');
            line.className = 'line';
            
            if (index > 0) {
                line.classList.add('old');
            }
            
            if (entry.result.startsWith('Ошибка:')) {
                line.textContent = `${entry.num1} ${entry.operation} ${entry.num2} = ${entry.result}`;
                line.style.color = 'red';
            } else {
                line.textContent = `${entry.num1} ${entry.operation} ${entry.num2} = ${entry.result}`;
            }
            
            historyDiv.appendChild(line);
        });
    }
    
    function validateInput(input, errorSpan) {
        const value = input.value;
        
        if (value.trim() === '') {
            errorSpan.textContent = '';
            input.classList.remove('bad');
        } else if (!isValidNumber(value)) {
            errorSpan.textContent = 'Только цифры';
            input.classList.add('bad');
        } else {
            errorSpan.textContent = '';
            input.classList.remove('bad');
        }
    }
    
    num1Input.addEventListener('input', function() {
        validateInput(num1Input, error1Span);
    });
    
    num2Input.addEventListener('input', function() {
        validateInput(num2Input, error2Span);
    });
    
    calculateBtn.addEventListener('click', calculate);
    

    num1Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    num2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    updateHistoryDisplay();
});