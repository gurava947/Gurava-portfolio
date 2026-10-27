import unittest

from support import run_solution


class StringRepetition2Test(unittest.TestCase):
    def test_case_01_hi_times_3(self):
        """Hi times 3."""
        result = run_solution('string-repetition-2', 'Hi\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'HiHiHi\n')

    def test_case_02_ab_times_0(self):
        """ab times 0."""
        result = run_solution('string-repetition-2', 'ab\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_01_negative_count(self):
        """Negative count."""
        result = run_solution('string-repetition-2', 'Hi\n-1')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_empty_string(self):
        """Empty string."""
        result = run_solution('string-repetition-2', '\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
