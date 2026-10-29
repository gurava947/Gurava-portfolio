import unittest

from support import run_solution


class MaximumTest(unittest.TestCase):
    def test_case_01_3_1_4(self):
        """3, 1, 4."""
        result = run_solution('maximum', '3\n3\n1\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n3\n4\n')

    def test_case_02_5_and_5(self):
        """5 and 5."""
        result = run_solution('maximum', '2\n5\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n5\n')


if __name__ == "__main__":
    unittest.main()
