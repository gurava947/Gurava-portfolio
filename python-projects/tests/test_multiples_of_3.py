import unittest

from support import run_solution


class MultiplesOf3Test(unittest.TestCase):
    def test_case_01_3_4_6_7_9(self):
        """3, 4, 6, 7, 9."""
        result = run_solution('multiples-of-3', '5\n3\n4\n6\n7\n9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n6\n9\n')

    def test_case_02_1_2_4(self):
        """1, 2, 4."""
        result = run_solution('multiples-of-3', '3\n1\n2\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
