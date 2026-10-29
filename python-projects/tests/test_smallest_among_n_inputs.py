import unittest

from support import run_solution


class SmallestAmongNInputsTest(unittest.TestCase):
    def test_case_01_5_3_8(self):
        """5, 3, 8."""
        result = run_solution('smallest-among-n-inputs', '3\n5\n3\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n3\n')

    def test_case_02_4_1_2_9(self):
        """4, 1, 2, 9."""
        result = run_solution('smallest-among-n-inputs', '4\n4\n1\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n1\n')


if __name__ == "__main__":
    unittest.main()
