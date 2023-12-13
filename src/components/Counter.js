import React from "react";
import "./Counter.css"
class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            CustomInput: 1,
            inputFocus: false,
            countHistory: [],
            errorMessage: "",
            newParam : 1
        };
    }

    handleIncrement = () => {
        const newCounter = this.state.counter + this.state.CustomInput;
        this.setState({
            counter: newCounter,
            CustomInput: 1,
        });
        this.updateHistory(newCounter);
    };

    handleDecrement = () => {
        const newCounter = this.state.counter - this.state.CustomInput;
        const updatedCounter = newCounter < 0 ? 0 : newCounter;
        this.setState({
            counter: updatedCounter,
            CustomInput: 1,
        });
        this.updateHistory(updatedCounter);
    };

    customInputHandle = (event) => {
        const inputValue = parseInt(event.target.value);
        if (!isNaN(inputValue)) {       // Check if inputValue is a valid number
            this.setState({ CustomInput: inputValue, errorMessage: "" });
        } else {
            // Handle invalid input (e.g., display an error message or user can use default customInput value of 1 until user give correct input)                   
            this.setState({ customInput: 1, errorMessage: "Invalid input. Please enter a number or use default number 1" });
        }
    }

    handleFocus = (event) => {
        event.target.classList.add("focus");
        event.target.select();
    }

    handleBlur = (event) => {
        event.target.classList.remove("focus");
    }

    resetCounter = () => {
        this.setState({
            counter: 0,
            countHistory: [],
        })
    }
    updateHistory(newCount) {
        const newHistory = [...this.state.countHistory];
        if (newHistory.length >= 5) {
            newHistory.shift(); // Remove the oldest count if history size exceeds 5
        }
        newHistory.push(newCount);
        this.setState({ countHistory: newHistory });
    }
    render() {
        const { counter } = this.state;
        return (
            <div>
                <h1>Counter App</h1>
                <h2>Count: {this.state.counter}</h2>

                <button id="increment" onClick={this.handleIncrement}>Increment</button>
                {/* disabling decrement button if the counter = 0, to avoid negative count */}
                <button id="decrement" onClick={this.handleDecrement} disabled={counter === 0}>Decrement</button>
                <button id="reset" onClick={this.resetCounter}>Reset</button>
                <br />
                <br />
                <div>
                    <label> Increment / Decrement value</label>
                    <input
                        type="number"
                        value={this.state.CustomInput}
                        onChange={this.customInputHandle}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        className={this.state.inputFocus ? "focus" : ""}
                    />
                    <p className="errorMessage">{this.state.errorMessage}</p>
                </div>
                <h3>Count History</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.countHistory.map((count, index) => (
                                <tr key={index}>
                                    <td>Count {index + 1}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Counter;