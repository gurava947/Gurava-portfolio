import unittest

from support import run_solution


class WinOrLoseOrDrawTest(unittest.TestCase):
    def test_case_01_3_versus_1(self):
        """3 versus 1."""
        result = run_solution('win-or-lose-or-draw', '3\n1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Win\n')

    def test_case_02_2_versus_2(self):
        """2 versus 2."""
        result = run_solution('win-or-lose-or-draw', '2\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Draw\n')

    def test_case_03_1_versus_3(self):
        """1 versus 3."""
        result = run_solution('win-or-lose-or-draw', '1\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Lose\n')


if __name__ == "__main__":
    unittest.main()
