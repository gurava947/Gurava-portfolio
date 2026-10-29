import unittest

from support import run_solution


class ModifyingListTest(unittest.TestCase):
    def test_case_01_index_1_to_99(self):
        """index 1 to 99."""
        result = run_solution('modifying-list', '1\n99\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[1, 99, 33, 45, 520, 64, 71, 852, 9999, 101010]\n')

    def test_case_02_index_0_to_5(self):
        """index 0 to 5."""
        result = run_solution('modifying-list', '0\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[5, 20, 33, 45, 520, 64, 71, 852, 9999, 101010]\n')


if __name__ == "__main__":
    unittest.main()
