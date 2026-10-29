import unittest

from support import run_solution


class CumulativeSumTest(unittest.TestCase):
    def test_case_01_1_2_3(self):
        """1, 2, 3."""
        result = run_solution('cumulative-sum', '3\n1\n2\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n3\n6\n')

    def test_case_02_5_and_2(self):
        """5 and -2."""
        result = run_solution('cumulative-sum', '2\n5\n-2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n3\n')


if __name__ == "__main__":
    unittest.main()
