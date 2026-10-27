import unittest

from support import run_solution


class CompositeNumbersInTheRangeTest(unittest.TestCase):
    def test_case_01_x_10_y_20(self):
        """X = 10, Y = 20."""
        result = run_solution('composite-numbers-in-the-range', '10\n20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n12\n14\n15\n16\n18\n20\n')

    def test_case_02_x_4_y_9(self):
        """X = 4, Y = 9."""
        result = run_solution('composite-numbers-in-the-range', '4\n9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n6\n8\n9\n')


if __name__ == "__main__":
    unittest.main()
