import unittest

from support import run_solution


class AverageOfNumbersFromMToNTest(unittest.TestCase):
    def test_case_01_1_to_5(self):
        """1 to 5."""
        result = run_solution('average-of-numbers-from-m-to-n', '1\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '15\n3.0\n')

    def test_case_02_10_to_20(self):
        """10 to 20."""
        result = run_solution('average-of-numbers-from-m-to-n', '10\n20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '165\n15.0\n')


if __name__ == "__main__":
    unittest.main()
