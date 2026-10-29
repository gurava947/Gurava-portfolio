import unittest

from support import run_solution


class SumOfCubesFromMToNTest(unittest.TestCase):
    def test_case_01_one_to_three(self):
        """one to three."""
        result = run_solution('sum-of-cubes-from-m-to-n', '1\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '36\n')

    def test_case_02_two_to_four(self):
        """two to four."""
        result = run_solution('sum-of-cubes-from-m-to-n', '2\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '99\n')


if __name__ == "__main__":
    unittest.main()
