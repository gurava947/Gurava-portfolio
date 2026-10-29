import unittest

from support import run_solution


class CumulativeAverageTest(unittest.TestCase):
    def test_case_01_1_2_3(self):
        """1, 2, 3."""
        result = run_solution('cumulative-average', '3\n1\n2\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1.0\n1.5\n2.0\n')

    def test_case_02_7_and_8(self):
        """7 and 8."""
        result = run_solution('cumulative-average', '2\n7\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7.0\n7.5\n')


if __name__ == "__main__":
    unittest.main()
