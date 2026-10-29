import unittest

from support import run_solution


class ListRepetition2Test(unittest.TestCase):
    def test_case_01_3_twice(self):
        """3 twice."""
        result = run_solution('list-repetition-2', '3\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[3, 3]\n')

    def test_case_02_7_zero_times(self):
        """7 zero times."""
        result = run_solution('list-repetition-2', '7\n0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[]\n')


if __name__ == "__main__":
    unittest.main()
