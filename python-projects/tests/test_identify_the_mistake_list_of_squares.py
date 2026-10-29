import unittest

from support import run_solution


class IdentifyTheMistakeListOfSquaresTest(unittest.TestCase):
    def test_case_01_three_values(self):
        """three values."""
        result = run_solution('identify-the-mistake-list-of-squares', '1,2,3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[1, 4, 9]\n')

    def test_case_02_two_values(self):
        """two values."""
        result = run_solution('identify-the-mistake-list-of-squares', '4,5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[16, 25]\n')


if __name__ == "__main__":
    unittest.main()
