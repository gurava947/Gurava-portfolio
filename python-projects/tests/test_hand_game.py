import unittest

from support import run_solution


class HandGameTest(unittest.TestCase):
    def test_case_01_rock_beats_scissors(self):
        """Rock beats Scissors."""
        result = run_solution('hand-game', 'Rock\nScissors\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Abhinav Wins\n')

    def test_case_02_paper_beats_rock(self):
        """Paper beats Rock."""
        result = run_solution('hand-game', 'Paper\nRock\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Abhinav Wins\n')

    def test_case_03_same_move(self):
        """Same move."""
        result = run_solution('hand-game', 'Paper\nPaper\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Tie\n')

    def test_case_04_scissors_loses_to_rock(self):
        """Scissors loses to Rock."""
        result = run_solution('hand-game', 'Scissors\nRock\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Anjali Wins\n')


if __name__ == "__main__":
    unittest.main()
