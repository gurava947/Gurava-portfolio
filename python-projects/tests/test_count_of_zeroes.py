import unittest

from support import run_solution


class CountOfZeroesTest(unittest.TestCase):
    def test_case_01_1002(self):
        """1002."""
        result = run_solution('count-of-zeroes', '1002\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Count of zeroes is not greater than three\n')

    def test_case_02_10000(self):
        """10000."""
        result = run_solution('count-of-zeroes', '10000\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Count of zeroes is greater than three\n')

    def test_case_03_123456(self):
        """123456."""
        result = run_solution('count-of-zeroes', '123456\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Count of zeroes is not greater than three\n')


if __name__ == "__main__":
    unittest.main()
