import unittest

from support import run_solution


class WinOrLoseOrDraw2Test(unittest.TestCase):
    def test_case_01_ahead(self):
        """ahead."""
        result = run_solution('win-or-lose-or-draw-2', '10\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Win\n')

    def test_case_02_level(self):
        """level."""
        result = run_solution('win-or-lose-or-draw-2', '5\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Draw\n')

    def test_case_03_behind(self):
        """behind."""
        result = run_solution('win-or-lose-or-draw-2', '3\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Lose\n')


if __name__ == "__main__":
    unittest.main()
