import unittest

from support import run_solution


class AverageOfGivenNumbersTest(unittest.TestCase):
    def test_case_01_whole_average(self):
        """whole average."""
        result = run_solution('average-of-given-numbers', '10 20 30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '20.0\n')

    def test_case_02_rounded_average(self):
        """rounded average."""
        result = run_solution('average-of-given-numbers', '1 2 3 4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2.5\n')


if __name__ == "__main__":
    unittest.main()
