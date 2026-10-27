# Hand game

## Question

Write a program that reads two moves, Rock, Paper or Scissors, and prints the winner.

## Supplied Python code

```python
A,B = input(), input()
if A == B :
    print("Tie")
elif A == "Rock" and B == "Scissors":
    print("Abhinav Wins")
elif A == "Paper" and B == "Rock":
    print("Abhinav Wins")
elif A == "Scissors" and B == "Paper":
    print("Abhinav Wins")
else:
    print("Anjali Wins")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Rock beats Scissors | `'Rock\nScissors\n'` | `'Abhinav Wins\n'` |
| Paper beats Rock | `'Paper\nRock\n'` | `'Abhinav Wins\n'` |
| Same move | `'Paper\nPaper\n'` | `'Tie\n'` |
| Scissors loses to Rock | `'Scissors\nRock\n'` | `'Anjali Wins\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hand_game.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two moves, one per line.
- Output: Tie, Abhinav Wins or Anjali Wins.
- Moves must match Rock, Paper or Scissors exactly, including capitalisation.
- Any other text falls through to Anjali Wins.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
